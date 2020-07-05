import db from '../../data/dbConfig';

export function getLastMessageByUserId(userId) {
  return db('emails')
    .orderBy('uid', 'desc')
    .first();
}

export function getOldestMessageByUserId(userId) {
  return db('emails')
    .orderBy('date', 'asc')
    .first();
}

export function getEmailList(query, label) {
  return db('emails')
    .limit(query.limit)
    .offset(query.skip)
    .orderBy('date', 'desc')
    .where('labels', 'like', `%${label}%`)
    .select('id', 'from', 'name', 'subject', 'date', 'email_body_text');
}

export function getEmailCountByLabelForUser(label, userId) {
  return db('emails')
    .where('user_id', userId)
    .where('labels', 'like', `%${label}%`)
    .count('id', { as: 'count' })
    .first();
}

export function getEmail(id) {
  return db('emails')
    .orderBy('date', 'desc')
    .where('id', id)
    .orWhere('message_id', id)
    .first();
}

export function getAllEmailsByMessageId(ids) {
  return db('emails')
    .select('id', 'name', 'subject', 'date', 'email_body_text')
    .whereIn('message_id', ids);
}

export function getThreadList(threadID) {
  return db('emails')
    .orderBy('date', 'desc')
    .where('gmThreadID', threadID);
}

export function getThreadID(id) {
  return db('emails')
    .where('message_id', id)
    .select('gmThreadID');
}

export function getThreadByMessage(message_id) {
  return db('emails').where;
}

export function searchByAny(query, column, keyword) {
  return db('emails')
    .limit(query.limit)
    .offset(query.skip)
    .where(column, 'like', `%${keyword}%`)
    .select('id', 'name', 'subject', 'date', 'email_body_text')
    .orderBy('date', 'desc');
}

export function searchAll(query, keyword) {
  return db('emails')
    .limit(query.limit)
    .offset(query.skip)
    .where('from', 'like', `%${keyword}%`)
    .orWhere('name', 'like', `%${keyword}%`)
    .orWhere('to', 'like', `%${keyword}%`)
    .orWhere('subject', 'like', `%${keyword}%`)
    .orWhere('email_body_text', 'like', `%${keyword}%`)
    .select('id', 'name', 'subject', 'date', 'email_body_text')
    .orderBy('date', 'desc');
}

export function searchByCount(column, keyword) {
  return db('emails')
    .where(column, 'like', `%${keyword}%`)
    .count('id', { as: 'count' })
    .first();
}

export function getReceived(address) {
  return db('emails')
    .where('from', address)
    .count('id', { as: 'count' });
}

export function getSent(address) {
  return db('emails')
    .where('to', address)
    .count('id', { as: 'count' });
}

export function getNameFromAddress(address) {
  return db('emails')
    .where('from', address)
    .select('name');
}

/////// Old Endpoints ////////
export function getResults(userId, results) {
  // const numArray = results.map(num => {
  //   return num * 1;
  // });

  return db('emails')
    .whereIn('message_id', results)
    .andWhere('user_id', userId);
}

export function emails(id) {
  return db('emails')
    .orderBy('date', 'desc')
    .where('user_id', id);
}

export function updateEmail(userId, uid, changes) {
  return db('emails')
    .where('user_id', userId)
    .andWhere('uid', uid)
    .update(changes);
}

export function deleteEmail(uid) {
  return db('emails')
    .where('uid', uid)
    .del();
}

export function getLastEmailFromUser(userid) {
  return db('emails')
    .orderBy('id', 'desc')
    .where('user_id', userid)
    .first();
}

export function findEmailbyId(id) {
  return db('emails')
    .where({ id })
    .first();
}

export function addEmail(email) {
  return db('emails')
    .insert(email, 'id')
    .then(([ids]) => {
      return findEmailbyId(ids);
    });
}

export function getEmailIds(userId) {
  return db('emails')
    .select('uid')
    .where('user_id', userId);
}

export function deleteAllEmailsByUser(userId) {
  return db('emails')
    .where('user_id', userId)
    .del();
}

export function getTagsForMessage(messageId) {
  return db('tags')
    .select('tag')
    .where('email_id', messageId);
}

export function getMessageTagsFromUser(userId) {
  const messages = db('messages').where({ userid });

  const newMessageArray = messages.map(message => {
    return get(message.id);
  });
  return newMessageArray;
}

export function get(messageId) {
  const messages = db('messages');

  if (messageId) {
    messages.where({ messageId }).first();

    const promises = [messages, getTagsForMessage(messageId)];

    return Promise.all(promises).then(results => {
      const [message, tags] = results;

      if (message) {
        message.tags = tags;

        return message;
      } else {
        return null;
      }
    });
  }
  return messages;
}
