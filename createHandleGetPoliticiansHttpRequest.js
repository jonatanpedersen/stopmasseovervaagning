export function createHandleGetPoliticiansHttpRequest (jade, getPoliticians) {
	return async function handleGetPoliticiansHttpRequest(req, res, next) {
		try {
			var html = jade.renderFile('./public/politikere.jade', {
				title: 'Politikere',
				description: 'Oversigt over danske politikere.',
				politicians: await getPoliticians()
			});

			return res.send(html);
		}
		catch (err) {
			return next(err);
		}
	};
}
