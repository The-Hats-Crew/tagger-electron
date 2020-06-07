import axios from 'axios';
import fetch from 'node-fetch';
import fs from "fs";
import {parsedMessagesToDBO, addMessagesToDb, addTagsToDb} from './helpers/tagger-ds-processors';
import { Readable } from 'stream';
const dsUrl = process.env.DS_PROD_URL || 'http://localhost:5000';

export const checkNewMail = (lastIndex = null, credentials) => {
  const postCredentials = {
    provider: credentials.provider,
    recent_id: lastIndex,
    token: {
      ...credentials.token,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    }
  };
  return new Promise((resolve, reject) => {
    fetch(dsUrl + '/api/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      keepalive: true,
      body: JSON.stringify({
        provider: credentials.provider,
        recent_id: lastIndex,
        token: {
          ...credentials.token,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET
        }
      })
    })
      .then(response => response.body)
      .then(stream => {
        let str = '';
        let message;

        stream.on("data", async (chunk) => {
          str += chunk.toString("utf-8");
          try {
            message = JSON.parse(str);
            str = '';
            const parsedMessage = parsedMessagesToDBO(message);
            const addedMessage = await addMessagesToDb(parsedMessage);
            addTagsToDb(addedMessage.id, message.smartTags);
          } catch (error) {

          }
        })

        stream.on('finish', () => {
          resolve("done");
        });
      });
  });
  // return axios.post(dsUrl + "/api/sync", {
  //   provider: credentials.provider,
  //   recent_id: lastIndex,
  //   token: {
  //     ...credentials.token,
  //     client_id: process.env.CLIENT_ID,
  //     client_secret: process.env.CLIENT_SECRET
  //   }
  // })
};
