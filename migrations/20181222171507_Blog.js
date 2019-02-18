exports.up = function (knex, Promise) {
  return knex.schema.createTable('blog', (table) => {
    table.increments('id');
    table.string('title', 120).notNullable();
    table.string('summary', 300);
    table.string('content', 12000);
    table.string('logo', 120);
    table.enu('state', ['draft', 'online']);
    table.integer('category');
    table.integer('likes');
    table.integer('dislikes')
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.uuid('key');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('blog');
};
