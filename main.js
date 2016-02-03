import express from 'express';
import harp from 'harp';
import { createPostSubmitArticle } from './articles';
import bodyParser from 'body-parser';
import jade from 'jade';
import { getPocketRssFeed } from './pocket';
import articles from './data/articles';
import moment from 'moment';
import url from 'url';

articles.sort(function(a, b) {
    a = new Date(a.date);
    b = new Date(b.date);
    return a>b ? -1 : a<b ? 1 : 0;
});

articles.map(article => {
  article.source = url.parse(article.url).hostname;

  return article;
});

moment.locale('da');

export function main () {
  let app = express();

  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    try {
      var html = jade.renderFile('./public/index.jade', {
        title: 'Stop Masseovervågning',
        description: 'Stop masseovervågning af internettet i Danmark.',
        articles: articles.map(article => {
          article.fromNow = moment(article.date).fromNow();

          return article;
        })
      });

      res.send(html);
    }
    catch (err) {
      res.send(err.stack);
    }
  });

  app.post('/api/submit-article', createPostSubmitArticle());
  app.use('/', express.static(__dirname + "/public"));
  app.use('/', harp.mount(__dirname + "/public"));

  let port = process.env.PORT || 9000;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
