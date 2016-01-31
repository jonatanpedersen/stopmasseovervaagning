'use strict';
import Github from 'github-api';

let github = new Github({
	token: process.env.GITHUB_TOKEN,
	auth: "oauth"
});

export function submitArticle(article, callback) {
	let repo = github.getRepo('jonatanpedersen', 'stopovervaagningnu');

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
