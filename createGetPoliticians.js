export function createGetPoliticians (politicians) {
	politicians.sort((a,b) => {
		if (a.fullName < b.fullName) return -1;
		if (a.fullName > b.fullName) return 1;
		return 0;
	});

	return async function getPoliticians () {
		return new Promise((resolve, reject) => {
			return resolve(politicians);
		});
	};
}
