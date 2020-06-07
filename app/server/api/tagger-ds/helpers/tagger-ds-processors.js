import * as messagesModel from '../../messages/message-model';

export function parsedMessagesToDBO(msg) {
  const mimeType = msg.payload.mimeType;
  const emailFrom = msg.payload.headers
    .find(header => header.name === 'From')
    .value.split(' ');
  let body;
  if (mimeType === 'text/html' || mimeType === 'text/plain') {
    body = msg.payload.body.data;
  } else if (mimeType === 'multipart/alternative') {
    body = msg.payload.parts[1].body.data;
  } else if (mimeType === 'multipart/related') {
    body = msg.payload.parts[0].parts[1].body.data;
  }

  let buffBody = Buffer.from(body, 'base64');
  return {
    from: emailFrom.length === 2 ? emailFrom[1] : emailFrom[0],
    name: emailFrom.length === 2 ? emailFrom[0] : emailFrom[0],
    to: msg.payload.headers.find(header => header.name === 'To').value,
    subject: msg.payload.headers.find(header => header.name === 'Subject')
      .value,
    email_body: buffBody.toString('ascii'),
    email_body_text: msg.snippet,
    message_id: msg.id,
    date: msg.payload.headers.find(header => header.name === 'Date').value,
    labels: msg.labelIds.toString(),
    gMsgId: msg.id,
    gmThreadID: msg.threadId,
    user_id: 1 // TODO
  };
}

export function addMessagesToDb(dboMessage) {
  messagesModel
    .addEmail(dboMessage)
    .then(res => {
      console.log(`${dboMessage.message_id} was added`);
    })
    .catch(err => {
      console.log(`${dboMessage.message_id} was NOT added: ${err.code}`);
    });
}
