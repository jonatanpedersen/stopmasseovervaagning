import async from 'async';
import cheerio from 'cheerio';
import request from 'request';
import relToAbs from 'rel-to-abs';
import fs from 'fs';

export function main() {
	let q;
	let pages = {};
	// create a queue object with concurrency 2
	q = async.queue(function (task, callback) {
		setTimeout(function() {

			let page = pages[task.url];

			if (page) {
				page.referers.push(task.referer);
				console.log('skipping', task.url);
				return callback();
			} else {
				pages[task.url] = page = {
					url: task.url,
					referers: []
				}

				if (task.referer && page.referers.indexOf(task.referer) === -1) {
					page.referers.push(task.referer);
				}
			}

			console.log('downloading', task.url);

			request(task.url, function (err, response, body) {
				if (err) {
					page.err = err;
				}
				if (response) {
					page.statusCode = response.statusCode;
				}

				if (err || response.statusCode !== 200) {

					console.log(err);
					return callback(err);
				}

				body = relToAbs.convert(body, task.url);
				let $ = cheerio.load(body);

				page.title = $('title').text();
				page.description = $('meta[name="description"]').prop('content');
				page.date =  new Date().toUTCString();

				if (task.depth < 2) {
					$('a').each(function(i, elem) {
						let a = $(this);
						let url = a.prop('href');

						if (url && url !== '') {
							q.push({
								url: url,
								referer: task.url,
								depth: task.depth + 1
							});
						}
					});
				}

				callback();

			});
		}, 1000);
	}, 10);


	// assign a callback
	q.drain = function() {
		fs.writeFileSync('pages.json', JSON.stringify(pages, null, 4), 'utf8');
		console.log('all items have been processed');
	}

	// add some items to the queue

	q.push({url: 'http://hnp.dk/', depth: 0});

}
