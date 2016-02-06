export function createHandleSignPetitionHttpRequest (signPetition) {
	return async function handleSignPetitionHttpRequest (req, res, next) {
		try {
			await signPetition(req.body.fornavn, req.body.efternavn, req.body.email);

			res.status(204).end();
		} catch (err) {
			return next(err);
		}
	};
}

export function createHandleGetPetitionSignatoryCountHttpRequest (getPetitionSignatoryCount) {
	return async function handleGetPetitionSignatoryCountHttpRequest(req, res) {
		try {
			let petitionSignatoryCount = await getPetitionSignatoryCount();

			res.json(petitionSignatoryCount);
		} catch (err) {
			res.end();
		}
	};
}

export function createSignPetition (db) {
	return async function signPetition (fornavn, efternavn, email) {
		return new Promise((resolve, reject) => {
			if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
				return reject('Ugyldig email');
			}

			return db.collection('underskrifter').insert(
				{ fornavn, efternavn, email },
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
