import express from 'express';
import { router } from "./routers";
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';

//generateToken for dev
import { generateToken } from './api/utils/jwt.utils';

//log out the logger
import logger from './api/middlewares/logger.middleware';
//mySQL
import * as MySQLConnector from './database/map.database';
//custom error handler
import handleError from './api/middlewares/error-handler.middleware';

//testing
import { payload } from './test.objects';



//init express
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

import * as AuthRegister from "./controllers/utils/auth.register"
import * as AuthLogin from "./controllers/utils/auth.login"



console.log('NODE_ENV_TYPE :',process.env.NODE_ENV)

if (process.env.NODE_ENV !== 'production'){
  console.log('JWT :', generateToken(payload))
}

//get routers
for (const route of router) {
  app.use(route.getPrefix(),route.getRouter());
}

app.get('/posts', (req, res)=>{
  res.json({'hi':'hi'})
})

//custom error handler
app.use(handleError);
//e.g => throw new CustomError('forgot something?', 400, 'you can do better than that');

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;