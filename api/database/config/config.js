const globalConstants = require("../../const/globalConstants");
module.exports = {
  development: {
    username: globalConstants.DB_USERNAME,
    password: globalConstants.DB_PASSWORD,
    database: globalConstants.DB_NAME,
    host: globalConstants.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: globalConstants.DB_USERNAME,
    password: globalConstants.DB_PASSWORD,
    database: globalConstants.DB_NAME,
    host: globalConstants.DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: globalConstants.DB_USERNAME,
    password: globalConstants.DB_PASSWORD,
    database: globalConstants.DB_NAME,
    host: globalConstants.DB_HOST,
    dialect: "postgres",
  },
};
