/* eslint linebreak-style: ["error", "windows"] */
const dotenv = require('dotenv');
// Update with your config settings.
dotenv.config();

module.exports = {
  test: {
    client: 'pg',
    connection: `${process.env.TESTDB_URL}`,
  },
  development: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}`,
  },
};
