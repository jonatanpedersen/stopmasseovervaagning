export function createHandleGetPoliticianByIdHttpRequest (getPoliticianById, getTweetsByTwitterUserScreenName) {
	return async function handleGetPoliticianByIdHttpRequest(req, res, next) {
		try {
			let politician = await getPoliticianById(req.params.politicianId)
			let tweets = [];

			if (politician.twitter) {
				tweets = await getTweetsByTwitterUserScreenName(politician.twitter);
				console.log(tweets);
			};

			res.render('politician.jade', {
				title: politician.name,
				description: politician.profile.text,
				politician: politician,
				tweets: tweets
			});
		}
		catch (err) {
			return next(err);
		}
	};
}
