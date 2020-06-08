
exports.up = function(knex) {
  return knex.schema.table("emails", tbl => {
    tbl.string("reply_to", 255);
  })
};

exports.down = function(knex) {
  return knex.schema.table("emails", tbl => {
    tbl.dropColumn("reply_to");
  })
};
