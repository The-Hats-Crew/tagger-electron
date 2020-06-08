import * as messagesModel from '../../messages/message-model';
import * as tagsModel from "../../tags/tag-model";

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

  const fromEmail = emailFrom[emailFrom.length - 1].replace(/<|>/g, "");
  const fromName = emailFrom.length > 1 ? emailFrom.slice(0, emailFrom.length - 1).join(" ") : emailFrom[0];
  const reply_to = msg.payload.headers.find(header => header.name === "Reply-To");
  const date = new Date(msg.payload.headers.find(header => header.name === 'Date').value)
  const buffBody = Buffer.from(body, 'base64');
  const response =  {
    from: fromEmail,
    name: fromName,
    reply_to: reply_to ? reply_to.value : msg.payload.headers.find(header => header.name === "From").value,
    to: msg.payload.headers.find(header => header.name === 'To').value,
    subject: msg.payload.headers.find(header => header.name === 'Subject')
      .value,
    email_body: buffBody.toString('ascii'),
    email_body_text: msg.snippet,
    message_id: msg.id,
    date: date,
    labels: msg.labelIds.toString(),
    gMsgId: msg.id,
    gmThreadID: msg.threadId,
    user_id: 1 // TODO
  };
  return response
}

export function addMessagesToDb(dboMessage) {
  return messagesModel
    .addEmail(dboMessage)
    .then(res => {
      console.log(`${dboMessage.message_id} was added`);
      return res;
    })
    .catch(err => {
      console.log(`${dboMessage.message_id} was NOT added: ${err.code}`);
      return err;
    });
}

export function addTagsToDb(id, tags){
  tags.forEach(tag => {
    tagsModel.addTag({tag, email_id: id})
    .then(res => {
      console.log(`${tag} was added`)
    })
    .catch(err => {
      console.log(`${tag} was not added`, err)
    })
  })
}
