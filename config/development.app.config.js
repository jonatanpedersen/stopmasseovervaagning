module.exports = {
	github: {
		token: null
	},
	mongo: {
		connection: 'mongodb://localhost/stopmasseovervaagning?safe=true&slaveOk=true&journal=true',
		dbOptions: {
			replSet: {
				ha: false,
				ssl: false,
				sslValidate: false
			}
		}
	},
	twitter: {
		consumer_key: null,
		consumer_secret: null,
		access_token: null,
		access_token_secret: null
	}
};
