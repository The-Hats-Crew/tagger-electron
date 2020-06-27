import axios from 'axios';
import fetch from 'node-fetch';
import electronConfig from "../../../electron-builder.config";
import oboe from 'oboe';
import {
  parsedMessagesToDBO,
  addMessagesToDb,
  addTagsToDb,
  addSentiment
} from './helpers/tagger-ds-processors';
import { Readable } from 'stream';
const io = require('socket.io')(3001);
const dsUrl = electronConfig.DS_PROD_URL;

export const checkNewMail = (lastIndex = null, credentials) => {
  const postCredentials = {
    provider: credentials.provider,
    recent_id: lastIndex,
    token: {
      ...credentials.token,
      client_id:
        electronConfig.CLIENT_ID,
      client_secret: electronConfig.CLIENT_SECRET
    }
  };
  console.log(postCredentials);

  return new Promise((resolve, reject) => {
    io.on('connection', socket => {
      fetch(dsUrl + '/api/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        keepalive: true,
        body: JSON.stringify(postCredentials)
      })
        .then(response => {
          if(response.status !== 200){
            reject({
              status: response.status,
              error: "Something went wrong"
            })
          }
          return response.body
        })
        .then(stream => {
          oboe(stream)
            .done(async message => {
              if (!message) {
                console.log('aborted');
                this.abort();
              }
              socket.emit('total_count', message.total_count);
              socket.emit('current_count', message.current_count);
              const parsedMessage = parsedMessagesToDBO(message);
              const addedMessage = await addMessagesToDb(parsedMessage);
              addTagsToDb(addedMessage.id, message.smartTags);
              addSentiment(addedMessage.id, message.sentiment);
            })
            .fail(() => {
              console.log('failed');
              reject({ error: 'Something went wrong' });
            });

          stream.on('finish', () => {
            console.log('finished');
            socket.emit('FromAPI', null);
            resolve('done');
          });

          stream.on("error", (err) => {
            console.log(err);
          })
        });
    });
  });
};
