export function createHandleSignPetitionHttpRequest (signPetition) {
	return async function handleSignPetitionHttpRequest (req, res, next) {
		try {
			await signPetition(req.body.firstName, req.body.lastName, req.body.email);

			res.status(204).end();
		} catch (err) {
			return next(err);
		}
	};
}

export function createHandleGetPetitionSignatoryCountHttpRequest (getPetitionSignatoryCount) {
	return async function handleGetPetitionSignatoryCountHttpRequest(req, res, next) {
		try {
			let petitionSignatoryCount = await getPetitionSignatoryCount();

			res.json(petitionSignatoryCount);
		} catch (err) {
			return next(err);
		}
	};
}

export function createSignPetition (db) {
	return async function signPetition (firstName, lastName, email) {
		return new Promise((resolve, reject) => {
			if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
				return reject('Invalid email');
			}

			return db.collection('signatures').insert(
				{ data: { firstName, lastName, email } },
				(err, file) => {
					if (err) {
						return reject(err);
					}

					resolve({});
				}
			);
		});
	};
}

export function createGetPetitionSignatoryCount (db) {
	return async function getPetitionSignatoryCount () {
		return new Promise((resolve, reject) => {
			return db.collection('underskrifter').count((err, count) => {
				if (err) {
					return reject(err);
				}

				return resolve(count);
			});
		});
	};
}
