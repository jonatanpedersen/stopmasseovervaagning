export function createGetPoliticalParties (politicalParties) {
	politicalParties.sort((a,b) => {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	});

	return async function getPoliticalParties () {
		return new Promise((resolve, reject) => {
			return resolve(politicalParties);
		});
	};
}
