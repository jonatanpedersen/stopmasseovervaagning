export function createIndexHttpHandler (jade, getArticles) {
	return async function indexHttpHandler (req, res) {
		try {
			var html = jade.renderFile('./public/index.jade', {
				title: 'Stop Masse-overvågning!',
				description: 'Stop masseovervågning af internettet i Danmark.',
				articles: await getArticles()
			});

			res.send(html);
		}
		catch (err) {
			res.send(err.stack);
		}
	};
}
