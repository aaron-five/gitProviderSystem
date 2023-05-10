const globalConstants = require("../../const/globalConstants");
module.exports = {
  development: {
    username: globalConstants.DB_USERNAME,
    password: globalConstants.DB_PASSWORD,
    database: globalConstants.DB_NAME,
    host: globalConstants.DB_HOST,
    port: globalConstants.DB_PORT,
    dialect: "postgres",
    ssl: true,
  },
  test: {
    username: globalConstants.DB_USERNAME,
    password: globalConstants.DB_PASSWORD,
    database: globalConstants.DB_NAME,
    host: globalConstants.DB_HOST,
    port: globalConstants.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: false,
    },
  },
  production: {
    username: globalConstants.DB_USERNAME,
    password: globalConstants.DB_PASSWORD,
    database: globalConstants.DB_NAME,
    host: globalConstants.DB_HOST,
    port: globalConstants.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: false,
    },
  },
};
