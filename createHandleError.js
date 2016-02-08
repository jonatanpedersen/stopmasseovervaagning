export function createHandleError () {
	return async function handleError(err, req, res, next) {
		if (err) {
			console.error(err);
			return res.status(500).json(err);
		}

		res.status(200).end();
	};
}
