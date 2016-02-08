export function createHandleError () {
	return async function handleError(err, req, res, next) {
		if (err) {
			console.error(err, err.stack);
			return res.status(500).json(err);
		}

		res.status(200).end();
	};
}
