'use strict';
import request from 'request';
import cheerio from 'cheerio';
import Github from 'github-api';

let github = new Github({
	token: cnf.github.token,
	auth: "oauth"
});

export function createHandleSubmitArticleHttpRequest () {
	return async function handleSubmitArticleHttpRequest (req, res, next) => {
		var url = req.body.url;

		request(url, function(err, response, html){
			if (err) {
				return res.json(err);
			}

			var $ = cheerio.load(html);

			var article = {
				title : $('head > title').text(),
				description : $('head > meta[name=description]').attr('content'),
				url: url,
				date: (new Date()).toISOString()
			};

			createArticleSubmissionPullRequest(article, (err) => {
				res.json(err);
			});
		})
	};
}

function createArticleSubmissionPullRequest(article, callback) {
	let repo = github.getRepo('jonatanpedersen', 'stopmasseovervaagning');

	let timestamp = (new Date).getTime().toString();
	var branchName = `submission-${timestamp}`;
	var filePath = 'public/data/articles/_data.json';

	return repo.branch(branchName, err => {
		if (err) {
			return callback(err);
		}

	  return repo.read(branchName, filePath, (err, data) => {
			if (err) {
				return callback(err);
			}

			data.push(article);

			var newData = JSON.stringify(data, null, 4);

			var message = "new article";
			var options = {
			  author: {name: 'Jonatan Pedersen', email: 'jp@jonatanpedersen.com'},
			  committer: {name: 'Jonatan Pedersen', email: 'jp@jonatanpedersen.com'},
			  encode: true
			}

			return repo.write(branchName, filePath, newData, message, options, err => {
				if (err) {
					return callback(err);
				}

				var options = {
				  title: message,
				  base: 'master',
				  head: branchName
				};

				return repo.createPullRequest(options, (err, pullRequest) => {
					if (err) {
						return callback(err);
					}

					return callback();
				});
			});
	  });
  });
}
