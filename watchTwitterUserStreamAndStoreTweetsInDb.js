import async from 'async';

export function watchTwitterUserStreamAndStoreTweetsInDb (twit, db) {
	twit.get('statuses/home_timeline', { count: 200 }, function(err, data, response) {
		async.eachSeries(data, async (tweet, callback) => {
			try {
				await storeTweetInDb(tweet, db);
				return callback();
			} catch (err) {
				return callback(err);
			}
		}, (err) => {
			if (err) {
				console.error('Error', err);
			}
		});
	});

	var stream = twit.stream('user')

	stream.on('tweet', async (tweet) => {
		try {
			return await storeTweetInDb(tweet, db);
		}
		catch (err) {
			console.error('Twit Error 1', err);
		}
	});

	stream.on('error', async (err) => {
		console.error('Twit Error 2', err);
	});
}

async function storeTweetInDb (tweet, db) {
	return new Promise((resolve, reject) => {
		return db.collection('tweets').save(
			{_id: tweet.id_str, data: tweet },
			(err) => {
				if (err) {
					return reject(err);
				}

				resolve(tweet);
			}
		);
	});
}
