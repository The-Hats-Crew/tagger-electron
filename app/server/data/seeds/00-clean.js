
import cleaner from 'knex-cleaner';

const cleanOptions = {
  mode: 'truncate',
  restartIdentity: true,
  ignoreTables: ['knex_migrations', 'knex_migrations_lock']
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return cleaner.clean(knex, cleanOptions);
};
