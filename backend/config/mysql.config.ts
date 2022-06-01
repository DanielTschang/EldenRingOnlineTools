require('dotenv').config();

export const DATA_SOURCES = {
    mySqlDataSource: {
      DB_HOST: process.env.MY_SQL_MAP_DB_HOST,
      DB_USER: process.env.MY_SQL_MAP_DB_USER,
      DB_PASSWORD: process.env.MY_SQL_MAP_DB_PASSWORD,
      DB_PORT: process.env.MY_SQL_MAP_DB_PORT,
      DB_DATABASE: process.env.MY_SQL_MAP_DB_DATABASE,
      DB_CONNECTION_LIMIT: process.env.MY_SQL_MAP_DB_CONNECTION_LIMIT ? parseInt(process.env.MY_SQL_MAP_DB_CONNECTION_LIMIT) : 4,
    }
  };

export const AUTH_SOURCES = {
  mySqlDataSource: {
    DB_HOST: process.env.MY_SQL_USER_DB_HOST,
    DB_USER: process.env.MY_SQL_USER_DB_USER,
    DB_PASSWORD: process.env.MY_SQL_USER_DB_PASSWORD,
    DB_PORT: process.env.MY_SQL_USER_DB_PORT,
    DB_DATABASE: process.env.MY_SQL_USER_DB_DATABASE,
    DB_CONNECTION_LIMIT: process.env.MY_SQL_USER_DB_CONNECTION_LIMIT ? parseInt(process.env.MY_SQL_USER_DB_CONNECTION_LIMIT) : 4,
  }
};