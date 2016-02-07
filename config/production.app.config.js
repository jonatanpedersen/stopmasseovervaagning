module.exports = {
	github: {
		token: process.env.GITHUB_TOKEN
	},
	mongo: {
		connection: process.env.MONGOLAB_URI,
		dbOptions: {
			replSet: {
				ha: false,
				ssl: true,
				sslValidate: true
			},
			mongos: {
				ssl: true,
				sslValidate: true,
				rejectUnauthorized: true
			}
		}
	},
	twitter: {
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token: process.env.TWITTER_ACCESS_TOKEN,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	}
};
