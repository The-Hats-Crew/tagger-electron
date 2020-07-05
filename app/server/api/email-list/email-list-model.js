import db from '../../data/dbConfig';

export function addEmailList(list) {
  return db('email_list').insert(list);
}

export function getEmailList() {
  return db('email_list');
}

export function getEmailListByIds(ids) {
  return db('email_list').whereIn(ids);
}

export function removeEmailListById(id) {
  return db('email_list')
    .where({ id })
    .del();
}
