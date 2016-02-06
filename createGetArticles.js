import articles from './data/articles.json';
import moment from 'moment';
import url from 'url';

articles.sort(function(a, b) {
		a = new Date(a.date);
		b = new Date(b.date);
		return a>b ? -1 : a<b ? 1 : 0;
});

articles.map(article => {
	article.source = url.parse(article.url).hostname;

	return article;
});

export function createGetArticles() {
	return async function getArticles() {
		return new Promise((resolve, reject) => {
			return resolve(articles.map(updateFromNow));
		});
	};
}

function updateFromNow (article) {
	article.fromNow = moment(article.date).fromNow();

	return article;
}
