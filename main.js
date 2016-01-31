import express from 'express';
import harp from 'harp';

export function main () {
  let app = express();
  let port = process.env.PORT || 9000;

  app.use('/', express.static(__dirname + "/public"));
  app.use('/', harp.mount(__dirname + "/public"));

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
