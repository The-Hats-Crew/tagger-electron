exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          email: 'taggerlabs20@gmail.com'
        }
      ]);
    });
};
