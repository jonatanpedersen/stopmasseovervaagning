import bodyParser from 'body-parser';
import cnf from 'cnf';
import express from 'express';
import harp from 'harp';
import jade from 'jade';
import moment from 'moment';
import mongodb from 'mongodb';
import { createConnectToMongoDB } from './createConnectToMongoDB';
import { createGetArticles } from './createGetArticles';
import { createIndexHttpHandler } from './createIndexHttpHandler';

export async function main () {
  let app = express();
  let connectToMongoDB = createConnectToMongoDB(mongodb);
  let db = await connectToMongoDB(cnf.mongo.connection);

  moment.locale('da');
  app.use(bodyParser.json());
  app.get('/', createIndexHttpHandler(jade, createGetArticles()));
  app.use('/', express.static(__dirname + "/public"));
  app.use('/', harp.mount(__dirname + "/public"));

  let port = process.env.PORT || 9000;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
