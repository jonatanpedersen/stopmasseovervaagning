export function createGetTweetsByTwitterUserScreenName (db) {
	return async function getTweetsByTwitterUserScreenName (twitterUserScreenName) {
		return new Promise((resolve, reject) => {
			return db.collection('tweets').find({'data.user.screen_name': twitterUserScreenName }).toArray((err, tweets) => {
				if (err) {
					return reject(err);
				}

				return resolve(tweets);
			});
		});
	};
}
