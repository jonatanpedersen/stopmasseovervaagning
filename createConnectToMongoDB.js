
export function createConnectToMongoDB(mongodb) {
  return async function connectToMongoDB(connectionString) {
    return new Promise(function(resolve, reject) {
      mongodb.MongoClient.connect(connectionString, (err, db) => {
        if (err)
          reject(err);

        resolve(db);
      });
    });
  };
}
