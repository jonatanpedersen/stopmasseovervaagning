import express from 'express';
import harp from 'harp';
import { createPostSubmitArticle } from './articles';
import bodyParser from 'body-parser';

export function main () {
  let app = express();
  app.use(bodyParser.json());

  app.post('/api/submit-article', createPostSubmitArticle());
  app.use('/', express.static(__dirname + "/public"));
  app.use('/', harp.mount(__dirname + "/public"));

  let port = process.env.PORT || 9000;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
