import bodyParser from 'body-parser';
import cnf from 'cnf';
import express from 'express';
import harp from 'harp';
import jade from 'jade';
import moment from 'moment';
import mongodb from 'mongodb';
import Twit from 'twit';
import { watchTwitterUserStreamAndStoreTweetsInDb } from './watchTwitterUserStreamAndStoreTweetsInDb';
import { createConnectToMongoDB } from './createConnectToMongoDB';
import { createGetArticles } from './createGetArticles';
import { createHandleIndexHttpRequest } from './createHandleIndexHttpRequest';
import {
  createHandleSignPetitionHttpRequest,
  createHandleGetPetitionSignatoryCountHttpRequest,
  createSignPetition,
  createGetPetitionSignatoryCount
} from './petition';

import { createHandleGetPoliticiansHttpRequest } from './createHandleGetPoliticiansHttpRequest';
import { createHandleGetPoliticianByIdHttpRequest } from './createHandleGetPoliticianByIdHttpRequest';
import { createGetPoliticians } from './createGetPoliticians';
import { createGetPoliticianById } from './createGetPoliticianById';

import articles from './data/articles.json';
import politicians from './data/politicians.json';

export async function main () {
  try {
    let app = express();

    var twit = new Twit(cnf.twitter);

    let connectToMongoDB = createConnectToMongoDB(mongodb);
    let db = await connectToMongoDB(cnf.mongo.connection);

    watchTwitterUserStreamAndStoreTweetsInDb(twit, db);

    let getArticles = createGetArticles(articles);
    let getPoliticians = createGetPoliticians(politicians);
    let getPoliticianById = createGetPoliticianById(politicians);

    let handleGetPoliticiansHttpRequest = createHandleGetPoliticiansHttpRequest(jade, getPoliticians);
    let handleGetPoliticianByIdHttpRequest = createHandleGetPoliticianByIdHttpRequest(jade, getPoliticianById);
    let handleIndexHttpRequest = createHandleIndexHttpRequest(jade, getArticles);

    moment.locale('da');
    app.use(bodyParser.json());
    app.get('/', handleIndexHttpRequest);
    app.get('/politikere', handleGetPoliticiansHttpRequest);
    app.get('/politikere/:politicianId', handleGetPoliticianByIdHttpRequest);

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
  } catch (err) {
    console.err(err);
  }
}
