module.exports = {
	mongo: {
		connection: 'mongodb://localhost/stopmasseovervaagning?safe=true&slaveOk=true&journal=true',
		dbOptions: {
			replSet: {
				ha: false,
				ssl: false,
				sslValidate: false
			}
		}
	}
};
