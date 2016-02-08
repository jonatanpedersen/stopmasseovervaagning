export function createHandleGetPoliticalPartyByIdHttpRequest (getPoliticalPartyById, getTweetsByTwitterUserScreenName) {
	return async function handleGetPoliticalPartyByIdHttpRequest(req, res, next) {
		try {
			let politicalParty = await getPoliticalPartyById(req.params.politicalPartyId)
			let tweets = [];

			if (politicalParty.twitter) {
				tweets = await getTweetsByTwitterUserScreenName(politicalParty.twitter);
			};

			res.render('politicalParty.jade', {
				title: politicalParty.name,
				description: politicalParty.text.join(' \n'),
				politicalParty: politicalParty,
				tweets: tweets
			});
		}
		catch (err) {
			return next(err);
		}
	};
}
