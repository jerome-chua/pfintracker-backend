import { Sequelize } from 'sequelize';
import url from 'url';

import allConfig from '../config/config.js';
import initUserModel from './user.mjs';
import initTransactionModel from './transaction.mjs';

/*
  Set environment config to correspnding environment node found in config.js
  based on NODE_ENV environment variable value (defaults to development if null)
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
  config.host = host;

  const { port } = dbUrl;
  config.port = port;

  // Pass previously broken up parameters seperately for Sequelize instance
  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Define models representing table in DB
db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Transaction = initTransactionModel(sequelize, Sequelize.DataTypes);

// Define Sequelize associations between models
db.User.hasMany(db.Transaction);
db.Transaction.belongsTo(db.User);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;