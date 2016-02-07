export function createHandleGetPoliticianByIdHttpRequest (jade, getPoliticianById) {
	return async function handleGetPoliticianByIdHttpRequest(req, res, next) {
		try {
			let politician = await getPoliticianById(req.params.politicianId)

			var html = jade.renderFile('./public/politiker.jade', {
				title: politician.name,
				description: politician.profile.text,
				politician: politician
			});

			res.send(html);
		}
		catch (err) {
			return next(err);
		}
	};
}
