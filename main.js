import express from 'express';
import harp from 'harp';
import { createPostSubmitArticle } from './articles';
import bodyParser from 'body-parser';
import jade from 'jade';
import { getPocketRssFeed } from './pocket';

export function main () {
  let app = express();

  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    getPocketRssFeed((err, articles) => {
      var html = jade.renderFile('./public/index.jade', {
        title: 'Stop Masseovervågning',
        description: 'Stop masseovervågning af internettet i Danmark.',
        articles
      });

      res.send(html);
    });
  });

  app.post('/api/submit-article', createPostSubmitArticle());
  app.use('/', express.static(__dirname + "/public"));
  app.use('/', harp.mount(__dirname + "/public"));

  let port = process.env.PORT || 9000;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
