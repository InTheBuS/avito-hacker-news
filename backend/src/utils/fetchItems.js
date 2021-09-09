const fetch = require('node-fetch');
const allSettled = require('promise.allsettled');

const fetchOneStory = (id) => {
	return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
		.then(res => res.json())
		.catch(e => {
			console.error(e)
		})
};

const createArrayOfPromisesByIds = (ids) => {
	if (!ids || ids.length < 1) {
		return null;
	}
	return ids.map((id) => {
		return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
			.then(res => res.json())
			.catch(e => {
				console.error(e)
			})
	});
};

const fetchArrayOfPromises = (Promises) => {
	if (!Promises || Promises.length < 1) {
		return null;
	}

	return allSettled(Promises)
		.then(comments => comments.filter((comment) => (comment.status === 'fulfilled' && !comment.deleted && comment.value && !comment.value.dead)))
		.catch(e => {
			console.error(e);
		})
		.then((comment) => comment.map(item => item.value))
};

module.exports = {fetchOneStory, createArrayOfPromisesByIds, fetchArrayOfPromises};