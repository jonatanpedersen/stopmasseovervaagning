
export function watchTwitterUserStreamAndStoreTweetsInDb (twit, db) {
	console.log('watchTwitterUserStreamAndStoreTweetsInDb');
	var stream = twit.stream('user')

	stream.on('tweet', async (tweet) => {
		try {
			let result = await storeTweetInDb(tweet, db);
			console.log(result);

			return result;
		}
		catch (err) {
			console.error('Error', err);
		}
	});
}
user-actions-follow-button js-follow-btn follow-button btn small small-follow-btn
user-actions-follow-button js-follow-btn follow-button btn small small-follow-btn

function storeTweetInDb (tweet, db) {
	return new Promise((resolve, reject) => {
		return db.collection('tweets').insert(
			tweet,
			(err) => {
				if (err) {
					return reject(err);
				}

				resolve(tweet);
			}
		);
	});
}
