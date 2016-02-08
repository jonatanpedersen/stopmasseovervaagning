export function createGetPoliticalParties (politicalParties) {
	return async function getPoliticalParties () {
		return new Promise((resolve, reject) => {
			return resolve(politicalParties);
		});
	};
}
