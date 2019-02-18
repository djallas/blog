exports.up = function (knex, Promise) {
   return knex.schema.createTable('users', (table) => {
     table.increments('id');
     table.string('names', 600).notNullable();
     table.string('username', 60);
     table.string('email', 600);
     table.string('passowrd', 255);
     table.enu('state', [true, false]);
     table.enu('role', ['user', 'admin']);
     table.boolean('contributor');
     table.string('motto', 255);
     table.string('bio', 255);
     table.string('googleId', 255);
     table.string('profile', 255);
     table.timestamp('created_time').defaultTo(knex.fn.now());
     table.timestamp('updated_time');
   });
 };
 
 exports.down = function (knex, Promise) {
   return knex.schema.dropTable('users');
 };
 