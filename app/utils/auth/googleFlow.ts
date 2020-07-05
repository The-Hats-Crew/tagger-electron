import config from '../../electron-builder.config';

const { google } = require('googleapis');
const http = require('http');
const url = require('url');
const enableDestroy = require('server-destroy');
const { shell } = require('electron');

export default function getAuthenticated() {
  return new Promise((resolve, reject) => {
    const oAuth2Client = new google.auth.OAuth2(
      config.CLIENT_ID,
      config.CLIENT_SECRET,
      'http://localhost:8000/oauth2callback'
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/gmail.readonly'
    });

    const server = http
      .createServer(async (req, res) => {
        try {
          if (req.url.indexOf('/oauth2callback') > -1) {
            const qs = new url.URL(req.url, 'http://localhost:8000')
              .searchParams;
            const code = qs.get('code');
            console.log(`Code is ${code}`);
            res.end('Authentication successful! Please return to the console.');
            server.destroy();

            const r = await oAuth2Client.getToken(code);
            console.info('Tokens acquired', r);
            oAuth2Client.setCredentials(r.tokens);
            resolve(r.tokens);
          }
        } catch (error) {
          reject(error);
        }
      })
      .listen(8000, () => {
        shell.openExternal(authorizeUrl);
      });
    enableDestroy(server);
  });
}
