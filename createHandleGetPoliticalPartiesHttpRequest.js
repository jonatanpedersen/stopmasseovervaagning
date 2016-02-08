export function createHandleGetPoliticalPartiesHttpRequest (getPoliticalParties) {
	return async function handleGetPoliticalPartiesHttpRequest(req, res, next) {
		try {
			res.render('politicalParties.jade', {
				title: 'Politiske partier',
				description: 'Oversigt over polistiske partier i folketinget.',
				politicalParties: await getPoliticalParties()
			});
		}
		catch (err) {
			return next(err);
		}
	};
}
