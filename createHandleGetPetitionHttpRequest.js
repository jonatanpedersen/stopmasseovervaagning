export function createHandleGetPetitionHttpRequest () {
	return async function andleGetPetitionHttpRequest(req, res, next) {
		try {
			res.render('petition.jade', {
				title: 'Underskriftindsamling',
				description: 'Oversigt over danske politikere.'
			});
		}
		catch (err) {
			return next(err);
		}
	};
}
