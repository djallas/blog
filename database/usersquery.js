/* eslint linebreak-style: ["error", "windows"] */
import knex from './knex';

// this is to get blog column from the db
function Users() {
  return knex('users');
}

// select all users from db
const getAll = () => Users().select();

// sign up new user
const create = user => Users().insert(user, 'id');

// sign in
// const create = user => Users().select(user, 'id');
const login = (user) => Users()
  .column('names', 'email', 'username', 'password', 'role', 'contributor', 'created_time')
  .select()
  .where({
    'email': user.email,
    'active': true
  })
  .first();

// google auth
const findGoogleUser = (user) => Users()
  .select('id','names', 'email', 'username', 'role', 'contributor', 'created_time', 'updated_time','motto','bio')
  .where({
    'googleId': user.googleId
  })
  .first();
// if we don't already have the google user, save the info
const createGoogleUser = (user) => Users().insert(user,'googleId');

// find user by id
const findById = (id) => Users()
  .select('id','names', 'email', 'username', 'role', 'contributor', 'created_time', 'updated_time', 'motto', 'bio')
  .where({
    'id':id
  })
  .first();

// set username
const updateUsername = (user) => Users()
  .update('username', user.username)
  .where('id', '=', user.id);

module.exports = {
   create,
   login,
   findGoogleUser,
   createGoogleUser,
   findById,
   updateUsername,
   getAll
};
