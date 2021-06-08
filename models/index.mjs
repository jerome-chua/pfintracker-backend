import { Sequelize } from 'sequelize';
import url from 'url';

import allConfig from '../config/config.js';
import initUserModel from './user.mjs';
import initExpenseModel from './expense.mjs';

/*
  Set environment config to correspnding environment node found in config.js
  based on NODE_ENV environment vairalbe value (defaults to development if null)
 */ 
const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];

const db = {};

let sequelize;

// Configurations for Heroku Postgres instance
if (env === 'production') {
  // Break apart Heroku database url & rebuild the configs needed
  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  // Pass previously broken up parameters seperately for Sequelize instance
  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


export default db;