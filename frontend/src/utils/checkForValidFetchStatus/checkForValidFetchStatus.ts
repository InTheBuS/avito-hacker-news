export const checkForValidFetchStatus = (url: string): Promise<Response>  => {
	return fetch(url)
		.then(res => {
			if (!res.ok) {
				throw new Error('fetch error');
			}
			return res
		})
		.catch(e => {
			throw new Error(e);
		})
};

export const checkForValidFetchStatusPost = (url: string, hash: string | null): Promise<Response> => {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({hash: hash}),
	}).then(res => {
		if (!res.ok) {
			throw new Error('fetch error');
		}
		return res;
	})
		.catch(e => {
			throw new Error(e);
		})
};