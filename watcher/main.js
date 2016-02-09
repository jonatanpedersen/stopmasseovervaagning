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

			if (pages[task.url]) {
				console.log('skipping', task.url);
				return callback();
			}

			console.log('downloading', task.url);

			request(task.url, function (err, response, body) {
				if (err || response.statusCode !== 200) {
					console.log(err);
					return callback(err);
				}

				body = relToAbs.convert(body, task.url);
				let $ = cheerio.load(body);

				let page = {
					url: task.url,
					title: $('title').text(),
					body: $('body').text(),
					date: Date.now()
				}

				pages[page.url] = page;

				if(task.depth < 2) {
					$('a').each(function(i, elem) {
					  let a = $(this);
						q.push({
							url:a.prop('href'),
							depth: task.depth + 1
						});
					});
				}

				callback();

			});
		}, 200);
	}, 2);


	// assign a callback
	q.drain = function() {
		fs.writeFileSync('pages.json', JSON.stringify(pages, null, 4), 'utf8');
		console.log('all items have been processed');
	}

	// add some items to the queue

	q.push({url: 'http://hnp.dk/', depth: 1});

}
