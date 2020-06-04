import imapSimple from 'imap-simple';
import mailparser from 'mailparser'
const simpleParser = mailparser.simpleParser;
import * as messagesModel from '../messages/message-model';

async function getLastMessageByUserId(taggerUserId) {
  try {
    const lastMessageId = messagesModel.getLastMessageByUserId(taggerUserId);

    return lastMessageId;
  } catch (e) {
    return 0; // empty email account
  }
}

export async function getLatestMail(imapUser, imapPassword, imapServer, lastMessageId) {
  const taggerUserId = 1; // TEMP SINGLE USER
  let lastMessage = await getLastMessageByUserId(taggerUserId);
  let startUID = 1;

  if(lastMessage && lastMessage !== 'null'){
    startUID = lastMessage.uid;
  }

  if(lastMessageId && lastMessageId !== 'null'){
    startUID = Number(lastMessageId);
  }
  let endUID = startUID + 500;

  const imapConnection = await imapSimple.connect({
    imap: {
      user: imapUser,
      password: imapPassword,
      host: imapServer,
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      debug: console.log
    }
    // onmail: handleOnMail => THE FUTURE
  });

  const box = await imapConnection.openBox('[Gmail]/All Mail');
  if(endUID > box.nextuid){
    endUID = box.nextuid;
  }
  console.log(endUID);

  // const searchCriteria = ['ALL', ['UID', lastMessageId + ':' + (Number(lastMessageId) + 1000)]];
  const searchCriteria = ['ALL', ['UID', startUID + ":" + endUID]];
  const fetchOptions = { bodies: '' }; // see https://github.com/mscdex/node-imap

  const searchResults = await imapConnection.search(
    searchCriteria,
    fetchOptions
  );

  imapConnection.end();

  if (lastMessageId != 0) {
    // the searchResults will always contain the last email, so we remove it
    searchResults.shift();
  }

  console.log(`IMAP returned ${searchResults.length} new messages`);

  try {
    const parsedMessages = await parseImapSearchResults(searchResults);
    const dboMessages = parsedMessagesToDBO(parsedMessages);
    addMessagesToDb(dboMessages);
  } catch (error) {
    console.log(error);
  }

  lastMessage = searchResults.length ? await getLastMessageByUserId(taggerUserId) : {uid: null};
  lastMessageId = lastMessage.uid;
  if(lastMessageId === box.nextuid - 1){
    return null;
  }
  return lastMessageId && lastMessageId < box.nextuid - 1 ? lastMessageId : endUID;
}

async function parseImapSearchResults(searchResults) {
  const imapMessages = Promise.all(
    searchResults.map(async imapMessage => {
      const firstPart = imapMessage.parts[0];
      const parsedMessage = await simpleParser(firstPart.body);

      return { ...parsedMessage, attributes: imapMessage.attributes };
    })
  );

  return imapMessages;
}

function parsedMessagesToDBO(parsedMessages) {
  const dboMessages = parsedMessages.map(msg => {
    return {
      uid: msg.attributes.uid,
      from: msg.from.value.map(f => f.address).join(','),
      name: msg.from.value.map(f => f.name).join(','),
      to: msg.to.value.map(t => t.address).join(','),
      subject: msg.subject,
      email_body: msg.html,
      email_body_text: msg.text,
      message_id: msg.messageId,
      date: msg.date,
      labels: msg.attributes['x-gm-labels'].toString(),
      gMsgId: msg.attributes['x-gm-msgid'],
      gmThreadID: msg.attributes['x-gm-thrid'],
      user_id: 1 // TODO
    };
  });

  return dboMessages;
}

function addMessagesToDb(dboMessages) {
  dboMessages.forEach(dboMessage => {
    messagesModel
      .addEmail(dboMessage)
      .then(res => {
        console.log(`${dboMessage.uid} was added`);
      })
      .catch(err => {
        console.log(`${dboMessage.uid} was NOT added: ${err.code}`);
      });
  });
}

export function checkForNewMail(lastMessageId) {
  console.log('Checking for new messages...');
  return new Promise((resolve, reject) => {
    resolve(getLatestMail('taggerlabs20@gmail.com', 'Lambdalabs20!', 'imap.gmail.com')); // TEMP TEMP TEMP
  })
}
