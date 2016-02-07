export function createGetPoliticianById (politicians) {
	return async function getPoliticianById (politicianId) {
		return new Promise((resolve, reject) => {
			let politician = politicians.filter(createPoliticianByIdFilter(politicianId)).shift();

			if (politician) {
				return resolve(politician);
			} else {
				reject();
			}
		});
	};
}

function createPoliticianByIdFilter (politicianId) {
	return function politicianByIdFilter (politician) {
		return politician.id === politicianId;
	}
}
