export function createHandleGetPoliticiansHttpRequest (getPoliticians) {
	return async function handleGetPoliticiansHttpRequest(req, res, next) {
		try {
			res.render('politicians.jade', {
				title: 'Politikere',
				description: 'Oversigt over danske politikere.',
				politicians: await getPoliticians()
			});
		}
		catch (err) {
			return next(err);
		}
	};
}
