export function createGetTweetsByTwitterUserScreenName (db) {
	return async function getTweetsByTwitterUserScreenName (twitterUserScreenName) {
		return new Promise((resolve, reject) => {
			return db.collection('tweets').find({'data.user.screen_name': twitterUserScreenName }).toArray((err, tweets) => {
				if (err) {
					return reject(err);
				}

				tweets = tweets.map(tweet => {
					return {
						text: tweet.data.text,
						created_at: new Date(tweet.data.created_at)
					};
				});

				tweets.sort(function(a, b) {
						a = a.created_at;
						b = b.created_at;
						return a > b ? -1 : a < b ? 1 : 0;
				});

				return resolve(tweets);
			});
		});
	};
}
