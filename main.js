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
import {
  createHandleSignPetitionHttpRequest,
  createHandleGetPetitionSignatoryCountHttpRequest,
  createSignPetition,
  createGetPetitionSignatoryCount
} from './underskriftindsamling';

export async function main () {
  let app = express();
  let connectToMongoDB = createConnectToMongoDB(mongodb);
  let db = await connectToMongoDB(cnf.mongo.connection);

  moment.locale('da');
  app.use(bodyParser.json());
  app.get('/', createIndexHttpHandler(jade, createGetArticles()));
  app.use('/', express.static(__dirname + "/public"));
  app.use('/', harp.mount(__dirname + "/public"));

  app.post('/api/underskriftindsamling/underskriv', createHandleSignPetitionHttpRequest(createSignPetition(db)));
  app.get('/api/underskriftindsamling/antal-underskrivere', createHandleGetPetitionSignatoryCountHttpRequest(createGetPetitionSignatoryCount(db)));

  app.use((err, req,res,next) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.status(200).end();
  });

  let port = process.env.PORT || 9000;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
