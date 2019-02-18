/* eslint linebreak-style: ["error", "windows"] */
import config from '../knexfile';

const configuration = config.development;
module.exports = require('knex')(configuration);
