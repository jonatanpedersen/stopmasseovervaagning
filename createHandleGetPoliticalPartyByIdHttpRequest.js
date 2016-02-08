export function createHandleGetPoliticalPartyByIdHttpRequest (getPoliticalPartyById, getPoliticiansByPoliticalPartyId) {
	return async function handleGetPoliticalPartyByIdHttpRequest(req, res, next) {
		try {
			let politicalParty = await getPoliticalPartyById(req.params.politicalPartyId);
			let politicians = await getPoliticiansByPoliticalPartyId(req.params.politicalPartyId);
			let tweets = [];

			if (politician.twitter) {
				tweets = await getTweetsByTwitterUserScreenName(politician.twitter);
			};

			res.render('politicalParty.jade', {
				title: politicalParty.name,
				description: politicalParty.name,
				politicalParty: politicalParty,
				politicians: politicians,
				tweets: tweets,
			});
		}
		catch (err) {
			return next(err);
		}
	};
}
