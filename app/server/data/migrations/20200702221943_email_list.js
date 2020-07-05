
exports.up = function(knex) {
  return knex.schema.createTable('email_list', tbl => {
    tbl
      .string('id', 255)
      .unique()
      .notNullable()
      .primary();
    tbl.string('threadId', 255);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('email_list');
};
