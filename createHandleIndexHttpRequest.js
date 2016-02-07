export function createHandleIndexHttpRequest (getArticles) {
	return async function handleIndexHttpRequest (req, res, next) {
		try {
			res.render('index.jade', {
				title: 'Stop Masse-overvågning!',
				description: 'Stop masseovervågning af internettet i Danmark.',
				articles: await getArticles()
			});
		}
		catch (err) {
			return next(err);
		}
	};
}
