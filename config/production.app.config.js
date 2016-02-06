module.exports = {
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
	}
};
