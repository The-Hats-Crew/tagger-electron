
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sentiment_analysis').truncate()

};
