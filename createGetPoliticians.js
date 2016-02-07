export function createGetPoliticians (politicians) {
	return async function getPoliticians () {
		return new Promise((resolve, reject) => {
			return resolve(politicians);
		});
	};
}
