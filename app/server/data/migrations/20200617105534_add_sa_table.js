exports.up = function(knex) {
  return knex.schema.createTable('sentiment_analysis', tbl => {
    tbl.increments();
    tbl.float('negative');
    tbl.float('neutral');
    tbl.float('positive');
    tbl.float('compound');
    tbl.float('final_pred');
    tbl
      .integer('email_id')
      .unsigned()
      .unique()
      .notNullable()
      .references('id')
      .inTable('emails')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sentiment_analysis');
};
