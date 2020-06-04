import db from "../../data/dbConfig";

export function addTag(tag) {
  return db("tags")
    .insert(tag, "id")
    .then(ids => {
      const [id] = ids;
      return findTagById(id);
    });
}

export function findTags() {
  return db("tags");
}

export function findTagById(id) {
  return db("tags")
    .select("*")
    .where({ id })
    .first();
}
export function getTagsByMessageId(messageId) {
  return db("tags")
    .join("emails", "emails.id", "tags.email_id")
    .select("tags.tag")
    .where("emails.message_id", messageId);
}

export function updateTag(id, changes) {
  return db("tags")
    .where({ id })
    .update(changes, "id")
    .then(() => {
      return findTagById(id);
    });
}

export function deleteTag(id) {
  return db("tags")
    .where({ id })
    .del();
}
