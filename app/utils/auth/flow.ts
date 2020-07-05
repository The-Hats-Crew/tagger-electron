/* eslint-disable max-classes-per-file */
/* eslint-disable no-console */
/*
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

import { AuthorizationRequest } from '@openid/appauth/built/authorization_request';
import {
  AuthorizationNotifier,
  AuthorizationRequestHandler,
  AuthorizationRequestResponse,
  BUILT_IN_PARAMETERS
} from '@openid/appauth/built/authorization_request_handler';
import { AuthorizationResponse } from '@openid/appauth/built/authorization_response';
import { AuthorizationServiceConfiguration } from '@openid/appauth/built/authorization_service_configuration';
import { NodeCrypto } from '@openid/appauth/built/node_support/';
import { NodeBasedHandler } from '@openid/appauth/built/node_support/node_request_handler';
import { NodeRequestor } from '@openid/appauth/built/node_support/node_requestor';
import {
  GRANT_TYPE_AUTHORIZATION_CODE,
  GRANT_TYPE_REFRESH_TOKEN,
  TokenRequest
} from '@openid/appauth/built/token_request';
import {
  BaseTokenRequestHandler,
  TokenRequestHandler
} from '@openid/appauth/built/token_request_handler';
import {
  TokenError,
  TokenResponse
} from '@openid/appauth/built/token_response';
import { StringMap } from '@openid/appauth/built/types';
const EventEmitter = require('events');

// import { log } from "./logger";

export class AuthStateEmitter extends EventEmitter {
  static ON_TOKEN_RESPONSE = 'on_token_response';
}

/* the Node.js based HTTP client. */
const requestor = new NodeRequestor();

/* an example open id connect provider */
const openIdConnectUrl = 'https://accounts.google.com';

/* example client configuration */
const clientId =
  '344403653662-4490acnq2d09eh01gs3c5brlgmql80nr.apps.googleusercontent.com';
const redirectUri = 'http://127.0.0.1:8000';
const scope =
  'profile https://www.googleapis.com/auth/gmail.readonly';

export class AuthFlow {
  private notifier: AuthorizationNotifier;
  private authorizationHandler: AuthorizationRequestHandler;
  private tokenHandler: TokenRequestHandler;

  readonly authStateEmitter: AuthStateEmitter;

  // state
  private configuration: AuthorizationServiceConfiguration | undefined;

  private refreshToken: string | undefined;
  private accessTokenResponse: TokenResponse | undefined;

  constructor() {
    this.notifier = new AuthorizationNotifier();
    this.authStateEmitter = new AuthStateEmitter();
    this.authorizationHandler = new NodeBasedHandler();
    this.tokenHandler = new BaseTokenRequestHandler(requestor);
    // set notifier to deliver responses
    this.authorizationHandler.setAuthorizationNotifier(this.notifier);
    // set a listener to listen for authorization responses
    // make refresh and access token requests.
    this.notifier.setAuthorizationListener((request, response, error) => {
      console.log('Authorization request complete ', request, response, error);
      if (response) {
        let codeVerifier: string | undefined;
        if (request.internal && request.internal.code_verifier) {
          codeVerifier = request.internal.code_verifier;
        }

        const authExtras = {
          code_challenge: request.extras.code_challenge,
          code_challenge_method: request.extras.code_challenge_method
        }

        this.makeRefreshTokenRequest(response.code, codeVerifier, authExtras)
          .then(result => {
            console.log("Refresh Token Request", result);
            return this.performWithFreshTokens();
          })
          .then(() => {
            this.authStateEmitter.emit(AuthStateEmitter.ON_TOKEN_RESPONSE, {
              token: this.accessTokenResponse
            });
            return console.log('All Done.');
          })
          .catch(err => console.error("Resposne Error", err));
      }
    });
  }

  fetchServiceConfiguration(): Promise<void> {
    return AuthorizationServiceConfiguration.fetchFromIssuer(
      openIdConnectUrl,
      requestor
    ).then(response => {
      console.log('Fetched service configuration', response);
      this.configuration = response;
    });
  }

  makeAuthorizationRequest(username?: string) {
    if (!this.configuration) {
      console.log('Unknown service configuration');
      return;
    }

    const extras: StringMap = { prompt: 'consent', access_type: 'offline' };
    if (username) {
      extras['console.login_hint'] = username;
    }

    // create a request
    const request = new AuthorizationRequest(
      {
        client_id: clientId,
        redirect_uri: redirectUri,
        scope,
        response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
        state: undefined,
        extras
      },
      new NodeCrypto()
    );

    console.log('Making authorization request ', this.configuration, request);

    this.authorizationHandler.performAuthorizationRequest(
      this.configuration,
      request
    );
  }

  private makeRefreshTokenRequest(
    code: string,
    codeVerifier: string | undefined
  ): Promise<Object> {
    if (!this.configuration) {
      console.log('Unknown service configuration');
      return Promise.resolve({});
    }

    const extras: StringMap = {};

    if (codeVerifier) {
      extras.code_verifier = codeVerifier;
    }

    // use the code to make the token request.
    let request = new TokenRequest({
      client_id: clientId,
      redirect_uri: redirectUri,
      grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
      code: code,
      refresh_token: undefined,
      extras: extras
    });
    console.log(request);
    console.log(this.configuration);
    return this.tokenHandler
      .performTokenRequest(this.configuration, request)
      .then(async response => {
        console.log('Token Request Response', response);
        this.refreshToken = response.refreshToken;
        this.accessTokenResponse = response;
        await this.performWithFreshTokens();
        return response;
      });
  }

  loggedIn(): boolean {
    return !!this.accessTokenResponse && this.accessTokenResponse.isValid();
  }

  signOut() {
    // forget all cached token state
    this.accessTokenResponse = undefined;
  }

  performWithFreshTokens(): Promise<string> {
    if (!this.configuration) {
      console.log('Unknown service configuration');
      return Promise.reject('Unknown service configuration');
    }
    if (!this.refreshToken) {
      console.log('Missing refreshToken.');
      return Promise.resolve('Missing refreshToken.');
    }
    if (this.accessTokenResponse && this.accessTokenResponse.isValid()) {
      // do nothing
      return Promise.resolve(this.accessTokenResponse.accessToken);
    }
    let request = new TokenRequest({
      client_id: clientId,
      redirect_uri: redirectUri,
      grant_type: GRANT_TYPE_REFRESH_TOKEN,
      code: undefined,
      refresh_token: this.refreshToken,
      extras: undefined
    });

    return this.tokenHandler
      .performTokenRequest(this.configuration, request)
      .then(response => {
        console.log(response);
        this.accessTokenResponse = response;
        return response.accessToken;
      });
  }
}
