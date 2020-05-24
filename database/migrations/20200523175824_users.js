
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.string('id').primary();//primary key
        table.string('name').notNullable();//não nulo
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();// 2 representa o tamanho da string
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
// npx knex init
// npx knex migrate:make users
// npx knex migrate:latest