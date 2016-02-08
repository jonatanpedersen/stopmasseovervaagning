export function createGetPoliticiansByPoliticalPartyId (politicians) {
	politicians.sort((a,b) => {
		if (a.fullName < b.fullName) return -1;
		if (a.fullName > b.fullName) return 1;
		return 0;
	});

	return async function getPoliticiansByPoliticalPartyId (politicalPartyId) {
		return new Promise((resolve, reject) => {
			let matchingPoliticians = politicians.filter(createPoliticianByPoliticalPartyIdFilter(politicalPartyId));

			if (matchingPoliticians) {
				return resolve(matchingPoliticians);
			} else {
				reject();
			}
		});
	};
}

function createPoliticianByPoliticalPartyIdFilter (politicalPartyId) {
	return function politicianByPoliticalPartyIdFilter (politician) {
		return politician.politicalPartyId === politicalPartyId;
	}
}
