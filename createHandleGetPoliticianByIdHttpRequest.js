export function createHandleGetPoliticianByIdHttpRequest (getPoliticianById, getPoliticalPartyById, getTweetsByTwitterUserScreenName) {
	return async function handleGetPoliticianByIdHttpRequest(req, res, next) {
		try {
			let politician = await getPoliticianById(req.params.politicianId);
			let politicalParty = await getPoliticalPartyById(politician.politicalPartyId);
			let tweets = [];

			if (politician.twitter) {
				tweets = await getTweetsByTwitterUserScreenName(politician.twitter);
			};

			res.render('politician.jade', {
				title: politician.name,
				description: politician.text.join(' \n'),
				politician: politician,
				politicalParty: politicalParty,
				tweets: tweets
			});
		}
		catch (err) {
			return next(err);
		}
	};
}
