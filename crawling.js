'use strict';
import request from 'request';
import cheerio from 'cheerio';
import async from 'async';
import fs from 'fs';
import url from 'url';

var baseUrl = 'http://www.danskepolitikere.dk';

request(baseUrl, function(err, response, html){
	if (err) {
		return res.json(err);
	}

	var $ = cheerio.load(html);

	var politikere = $('nav.overview-person p a').map(function (i, element) {
		var pol = {
			id: url.parse(baseUrl + $(this).attr('href')).pathname,
			navn: $(this).text(),
			parti: $(this).closest('section').children('h3').first().text(),
			url: baseUrl + $(this).attr('href')
		};

		return pol;
	}).get();

	async.mapSeries(politikere, (politiker, callback) => {

		request(politiker.url, (err, response, html) => {
			if (err) {
				return callback(err)
			}

			var $ = cheerio.load(html);

			politiker.profile = {
					imageUrl: baseUrl + $('#profile img').attr('src'),
					text: $('#content').text()
			};

			if (politiker.profile.imageUrl) {
				request(politiker.profile.imageUrl).pipe(fs.createWriteStream('./data/politikere' + politiker.id + '.jpg'))
			}

			politiker.twitter = $('#twitter-feed h4').text();

			console.log(politiker);
			return callback(null, politiker);
		});
	},(err, politikere) => {
		fs.writeFileSync('./data/politikere.json', JSON.stringify(politikere, null, 4), 'utf8');

		console.log('DONE');

	});
})
