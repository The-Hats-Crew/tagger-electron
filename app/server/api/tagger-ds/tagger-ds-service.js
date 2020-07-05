import fetch from 'node-fetch';
import oboe from 'oboe';
import { google } from 'googleapis';
import moment from 'moment';
import electronConfig from '../../../electron-builder.config';
import {
  parsedMessagesToDBO,
  addMessagesToDb,
  addTagsToDb,
  addSentiment,
  addEmailList
} from './helpers/tagger-ds-processors';
import { getOldestMessageByUserId, getEmail } from '../messages/message-model';
import {
  getEmailList,
  removeEmailListById
} from '../email-list/email-list-model';

const io = require('socket.io')(3001);

const dsUrl =
  process.env.NODE_ENV === 'production'
    ? electronConfig.DS_PROD_URL
    : 'http://localhost:5000';

// eslint-disable-next-line import/prefer-default-export
const processEmailList = async (lastIndex = null, credentials) => {
  let postCredentials;
  try {
    const messages = await getEmailList();
    // eslint-disable-next-line no-console
    postCredentials = {
      provider: credentials.provider,
      recent_id: lastIndex,
      email_list: messages,
      token: {
        ...credentials.token,
        client_id: electronConfig.CLIENT_ID,
        client_secret: electronConfig.CLIENT_SECRET
      }
    };
    console.log(postCredentials);
    console.log(dsUrl);
  } catch (error) {
    console.log(error);
  }

  return new Promise((resolve, reject) => {
    io.on('connection', socket => {
      // eslint-disable-next-line promise/catch-or-return
      fetch(`${dsUrl}/api/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        keepalive: true,
        body: JSON.stringify(postCredentials)
      })
        .then(response => {
          if (response.status !== 200) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              status: response.status,
              error: 'Something went wrong'
            });
          }
          return response.body;
        })
        // eslint-disable-next-line promise/always-return
        .then(stream => {
          oboe(stream)
            .done(async message => {
              if (!message) {
                console.log('aborted');
                this.abort();
              }
              try {
                const find = await getEmail(message.id);
                if (!find) {
                  console.log(find);
                  const parsedMessage = parsedMessagesToDBO(message);
                  const addedMessage = await addMessagesToDb(parsedMessage);
                  addTagsToDb(addedMessage.id, message.smartTags);
                  addSentiment(addedMessage.id, message.sentiment);
                }
                await removeEmailListById(message.id);
              } catch (error) {
                console.log(error);
              }
            })
            .fail(() => {
              console.log('failed');
              // eslint-disable-next-line prefer-promise-reject-errors
              reject({ error: 'Something went wrong' });
            });

          stream.on('finish', () => {
            console.log('finished');
            socket.emit('FromAPI', null);
            resolve('done');
          });

          stream.on('error', err => {
            console.log(err);
          });
        })
        .catch(err => reject(err));
    });
  });
};

async function checkNextEmail(gmail, nextPageToken, lastIndex, credentials) {
  const res = await gmail.users.messages.list({
    userId: 'me',
    maxResults: 400,
    pageToken: nextPageToken
  });
  res.data.messages.forEach(async message => {
    await addEmailList(message);
  })
  await processEmailList(lastIndex, credentials);
  return new Promise((resolve, reject) => {
    if (res.data.nextPageToken !== null) {
      checkNextEmail(gmail, res.data.nextPageToken);
    } else {
      resolve('done');
    }
  });
}

async function checkOldestEmails(gmail, lastIndex, credentials, userId = 1) {
  let date;
  const email = await getOldestMessageByUserId(userId);
  if (!email) {
    date = moment().format('L');
  } else {
    const emailDate = new Date(Date(email.date));
    date = moment(emailDate).format('L');
    console.log(date);
  }
  try {
    const res = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 400,
      q: `before:${date}`
    });
    console.log(res.data);
    if (res.data.messages) {
      res.data.messages.forEach(async message => {
        await addEmailList(message);
      })
      await processEmailList(lastIndex, credentials);
      if (res.data.nextPageToken !== null) {
        return checkNextEmail(
          gmail,
          res.data.nextPageToken,
          lastIndex,
          credentials
        );
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

async function checkEmailList(credentials, lastIndex) {
  const oAuth2Client = new google.auth.OAuth2(
    electronConfig.CLIENT_ID,
    electronConfig.CLIENT_SECRET,
    'http://localhost:8000/oauth2callback'
  );
  oAuth2Client.credentials = credentials.token;
  const gmail = google.gmail({
    version: 'v1',
    auth: oAuth2Client
  });
  const res = checkOldestEmails(gmail, lastIndex, credentials);
  return new Promise((resolve, reject) => {
    try {
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

// eslint-disable-next-line import/prefer-default-export
export const checkNewMail = async (lastIndex = null, credentials) => {
  const list = await getEmailList();
  console.log("List in DB", list);
  if (list.length) {
    await processEmailList(lastIndex, credentials);
  }
  const res = await checkEmailList(credentials, lastIndex);
  return new Promise((resolve, reject) => {
    resolve(res);
  });
};
