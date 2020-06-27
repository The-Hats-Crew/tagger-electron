export default {

}

import db from "../../data/dbConfig";

export const add = (email_id, sa_list) => {
  return db("sentiment_analysis").insert({
    negative: sa_list[0],
    neutral: sa_list[1],
    positive: sa_list[2],
    compound: sa_list[3],
    final_pred: sa_list[4],
    email_id
  })
  .then(([id]) => {
    return findById(id);
  })
}

export const findById = (id) => {
  return db("sentiment_analysis").where({id}).first();
}
