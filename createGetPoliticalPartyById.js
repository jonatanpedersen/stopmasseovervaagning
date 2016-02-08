export function createGetPoliticalPartyById (politicalPartys) {
	return async function getPoliticalPartyById (politicalPartyId) {
		return new Promise((resolve, reject) => {
			let politicalParty = politicalPartys.filter(createPoliticalPartyByIdFilter(politicalPartyId)).shift();

			if (politicalParty) {
				return resolve(politicalParty);
			} else {
				reject();
			}
		});
	};
}

function createPoliticalPartyByIdFilter (politicalPartyId) {
	return function politicalPartyByIdFilter (politicalParty) {
		return politicalParty.id === politicalPartyId;
	}
}
