exports.seed = function(knex) {
  // truncate all emails
  return knex('tags').truncate();
};
