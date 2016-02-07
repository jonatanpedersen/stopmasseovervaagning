export function createHandleIndexHttpRequest (jade, getArticles) {
	return async function handleIndexHttpRequest (req, res, next) {
		try {
			var html = jade.renderFile('./public/index.jade', {
				title: 'Stop Masse-overvågning!',
				description: 'Stop masseovervågning af internettet i Danmark.',
				articles: await getArticles()
			});

			res.send(html);
		}
		catch (err) {
			return next(err);
		}
	};
}
