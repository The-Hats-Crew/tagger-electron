import db from "../../data/dbConfig";

export function addUser(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findUserById(id);
    });
}

export function findUser(user) {
  return db("users")
    .select("id")
    .where("email", "=", user)
    .first();
}

export function findUserById(id) {
  return db("users")
    .select("*")
    .where({ id })
    .first();
}

export function updateUser(id, changes) {
  return db("users")
    .where({ id })
    .update(changes, "*")
    .then(() => {
      return findUserById(id);
    });
}

export function deleteUser(id) {
  return db("users")
    .where({ id })
    .del();
}
