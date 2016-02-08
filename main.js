import bodyParser from 'body-parser';
import cnf from 'cnf';
import express from 'express';
import harp from 'harp';
import jade from 'jade';
import moment from 'moment';
import mongodb from 'mongodb';
import Twit from 'twit';

import articles from './data/articles.json';
import { createConnectToMongoDB } from './createConnectToMongoDB';
import { createGetArticles } from './createGetArticles';
import { createGetPetitionSignatoryCount } from './petition';
import { createGetPoliticalParties } from './createGetPoliticalParties';
import { createGetPoliticalPartyById } from './createGetPoliticalPartyById';
import { createGetPoliticians } from './createGetPoliticians';
import { createGetPoliticianById } from './createGetPoliticianById';
import { createGetPoliticiansByPoliticalPartyId } from './createGetPoliticiansByPoliticalPartyId';
import { createGetTweetsByTwitterUserScreenName } from './createGetTweetsByTwitterUserScreenName';
import { createHandleError } from './createHandleError';
import { createHandleGetPetitionHttpRequest} from './createHandleGetPetitionHttpRequest'
import { createHandleGetPetitionSignatoryCountHttpRequest } from './petition';
import { createHandleGetPoliticalPartiesHttpRequest } from './createHandleGetPoliticalPartiesHttpRequest';
import { createHandleGetPoliticalPartyByIdHttpRequest } from './createHandleGetPoliticalPartyByIdHttpRequest';
import { createHandleGetPoliticianByIdHttpRequest } from './createHandleGetPoliticianByIdHttpRequest';
import { createHandleGetPoliticiansHttpRequest } from './createHandleGetPoliticiansHttpRequest';
import { createHandleIndexHttpRequest } from './createHandleIndexHttpRequest';
import { createHandleSignPetitionHttpRequest } from './petition';
import { createSignPetition } from './petition';
import politicalParties from './data/politicalParties.json';
import politicians from './data/politicians.json';
import { watchTwitterUserStreamAndStoreTweetsInDb } from './watchTwitterUserStreamAndStoreTweetsInDb';

export async function main () {
  try {
    moment.locale('da');

    let connectToMongoDB = createConnectToMongoDB(mongodb);
    let db = await connectToMongoDB(cnf.mongo.connection);

    // let twit = new Twit(cnf.twitter);
    // watchTwitterUserStreamAndStoreTweetsInDb(twit, db);

    let app = express();
    app.locals.moment = moment;
    app.use(bodyParser.json());

    let getArticles = createGetArticles(articles);
    let getPoliticalParties = createGetPoliticalParties(politicalParties);
    let getPoliticalPartyById = createGetPoliticalPartyById(politicalParties);
    let getPoliticians = createGetPoliticians(politicians);
    let getPoliticianById = createGetPoliticianById(politicians);
    let getPoliticiansByPoliticalPartyById = createGetPoliticiansByPoliticalPartyId(politicians);
    let getTweetsByTwitterUserScreenName = createGetTweetsByTwitterUserScreenName(db);
    let handleGetPetitionHttpRequest = createHandleGetPetitionHttpRequest();
    let handleGetPoliticalPartiesHttpRequest = createHandleGetPoliticalPartiesHttpRequest(getPoliticalParties);
    let handleGetPoliticalPartyByIdHttpRequest = createHandleGetPoliticalPartyByIdHttpRequest(getPoliticalPartyById, getPoliticiansByPoliticalPartyById, getTweetsByTwitterUserScreenName);
    let handleGetPoliticiansHttpRequest = createHandleGetPoliticiansHttpRequest(getPoliticians);
    let handleGetPoliticianByIdHttpRequest = createHandleGetPoliticianByIdHttpRequest(getPoliticianById, getPoliticalPartyById, getTweetsByTwitterUserScreenName);
    let handleIndexHttpRequest = createHandleIndexHttpRequest(getArticles);

    app.get('/', handleIndexHttpRequest);
    app.post('/api/underskriftindsamling/underskriv', createHandleSignPetitionHttpRequest(createSignPetition(db)));
    app.get('/api/underskriftindsamling/antal-underskrivere', createHandleGetPetitionSignatoryCountHttpRequest(createGetPetitionSignatoryCount(db)));
    app.get('/politiske-partier', handleGetPoliticalPartiesHttpRequest);
    app.get('/politiske-partier/:politicalPartyId', handleGetPoliticalPartyByIdHttpRequest);
    app.get('/politikere', handleGetPoliticiansHttpRequest);
    app.get('/politikere/:politicianId', handleGetPoliticianByIdHttpRequest);
    app.get('/underskriftindsamling', handleGetPetitionHttpRequest);
    app.use('/lib', express.static(__dirname + "/node_modules/bootstrap/dist/js"));
    app.use('/lib', express.static(__dirname + "/node_modules/jquery/dist"));
    app.use('/', express.static(__dirname + "/public"));
    app.use('/', harp.mount(__dirname + "/public"));
    app.use(createHandleError());

    let port = process.env.PORT || 9000;

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (err) {
    console.err(err);
  }
}
