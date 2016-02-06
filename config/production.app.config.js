module.exports = {
	mongo: {
		connection: process.env.MONGOLAB_URI,
		dbOptions: {
			replSet: {
				ha: false,
				ssl: true,
				sslValidate: false
			},
			mongos: {
				ssl: true,
				sslValidate: false,
				rejectUnauthorized: false
			}
		}
	}
};
