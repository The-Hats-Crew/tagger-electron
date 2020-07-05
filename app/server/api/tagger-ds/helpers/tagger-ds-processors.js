import * as messagesModel from '../../messages/message-model';
import * as tagsModel from '../../tags/tag-model';
import * as saModel from '../../sentiment_analysis/sa-model';
import * as emailListModel from '../../email-list/email-list-model';

export function parsedMessagesToDBO(msg) {
  const { mimeType } = msg.payload;
  const emailFrom = msg.payload.headers
    .find(header => header.name === 'From')
    .value.split(' ');
  let body;
  if (mimeType === 'text/html' || mimeType === 'text/plain') {
    body = msg.payload.body.data;
  } else if (mimeType === 'multipart/alternative') {
    try {
      body = msg.payload.parts[1].body.data;
    } catch (error) {
      body = msg.payload.parts[0].body.data;
    }
  } else if (mimeType === 'multipart/related') {
    try {
      body = msg.payload.parts[0].parts[1].body.data;
    } catch (error) {
      body = msg.payload.parts[0].body.data;
    }
  } else if (mimeType === 'multipart/mixed') {
    body = msg.payload.parts[0].body.data;
  }

  const fromEmail = emailFrom[emailFrom.length - 1].replace(/<|>/g, '');
  const fromName =
    emailFrom.length > 1
      ? emailFrom.slice(0, emailFrom.length - 1).join(' ')
      : emailFrom[0];
  // eslint-disable-next-line @typescript-eslint/camelcase
  const reply_to = msg.payload.headers.find(
    header => header.name === 'Reply-To'
  );
  const emailDate = msg.payload.headers.find(header => header.name === 'Date');
  const date = new Date(emailDate ? emailDate.value : Date.now());
  let buffBody;
  try {
    buffBody = Buffer.from(body, 'base64').toString('ascii');
  } catch (error) {
    buffBody = body;
  }
  const response = {
    from: fromEmail,
    name: fromName,
    // eslint-disable-next-line @typescript-eslint/camelcase
    reply_to: reply_to
      ? reply_to.value
      : msg.payload.headers.find(header => header.name === 'From').value,
    to: msg.payload.headers.find(header => header.name === 'To').value,
    subject: msg.payload.headers.find(header => header.name === 'Subject')
      .value,
    email_body: buffBody,
    email_body_text: msg.snippet,
    message_id: msg.id,
    date,
    labels: msg.labelIds.toString(),
    gMsgId: msg.id,
    gmThreadID: msg.threadId,
    user_id: 1 // TODO
  };
  return response;
}

export function addMessagesToDb(dboMessage) {
  return messagesModel.addEmail(dboMessage);
}

export function addTagsToDb(id, tags) {
  tags.forEach(tag => {
    tagsModel
      .addTag({ tag, email_id: id })
      .then(res => {
        console.log(`${tag} was added`);
      })
      .catch(err => {
        console.log(`${tag} was not added`, err);
      });
  });
}

export function addSentiment(id, sentiment) {
  saModel
    .add(id, sentiment)
    .then(sa => {
      console.log(`${sa} was added`);
    })
    .catch(err => {
      console.log(`${sa} was not added`, err);
    });
}

export function addEmailList(list) {
  return emailListModel.addEmailList(list);
}
