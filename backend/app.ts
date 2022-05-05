import path from 'path';
import express from 'express';
import { router } from "./routers";
import morgan from 'morgan';

import * as MySQLConnector from './database/MapDB';

const app: express.Application = express();
const port:number = 3150;

MySQLConnector.init();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

for (const route of router) {
  app.use(route.getRouter());
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;