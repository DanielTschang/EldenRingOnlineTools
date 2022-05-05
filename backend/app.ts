import path from 'path';
import express from 'express';
import { router } from "./routers";
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import { generateToken } from './api/utils/jwt.utils';

import logger from './api/middlewares/logger.middleware';

import * as MySQLConnector from './database/MapDB';

const app: express.Application = express();
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

if (process.env.NODE_ENV !== 'production'){
  console.log('JWT', generateToken())
}



app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

for (const route of router) {
  app.use(route.getRouter());
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;