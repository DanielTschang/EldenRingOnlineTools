import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { router } from "./routers";
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import { generateToken } from './api/utils/jwt.utils';

import logger from './api/middlewares/logger.middleware';

import * as MySQLConnector from './database/map.database';

import handleError from './api/middlewares/error-handler.middleware';

const app:express.Application = express();
const port:number = 3150;

MySQLConnector.init();

//MIDDLEWARES
//compress all the responses
app.use(compression());
// adding set of security middlewares
app.use(helmet());
// parse incoming request body and append data to `req.body`
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// enable all CORS request
app.use(cors());
//add logger middleware
app.use(logger);


console.log(process.env.NODE_ENV)
console.log(process.env.MY_SQL_DB_HOST)

if (process.env.NODE_ENV !== 'production'){
  console.log('JWT', generateToken())
}

for (const route of router) {
  app.use(route.getPrefix(),route.getRouter());
}


app.get('/error', (req, res) => {
  res.send("Custom error landing page.")
})

//custom error handler
app.use(handleError);
//e.g => throw new CustomError('forgot something?', 400, 'you can do better than that');

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;