
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('email_list').del();
};
