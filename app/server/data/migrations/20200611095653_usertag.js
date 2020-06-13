
exports.up = function(knex) {
    return knex.schema
    .createTable("user_tags", tbl => {
        tbl.increments();
        tbl.string("usertag");
        tbl.integer("email_id").unsigned().notNullable().references("id").inTable("emails").onDelete("RESTRICT").onUpdate("CASCADE");});
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("user_tags")
};
