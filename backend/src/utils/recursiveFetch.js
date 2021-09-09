const allSettled = require('promise.allsettled');
const {createArrayOfPromisesByIds, fetchArrayOfPromises} = require('./fetchItems');

async function recursionFetchCommentsTree(ids) {
	if (ids && ids.length < 1) return;

	const comments = await createArrayOfPromisesByIds(ids);
	const promise = await fetchArrayOfPromises(comments)
		.catch(e => {
			console.error(e)
		});

	await allSettled(promise.map(async (comment) => {
		if (comment.kids) {
			comment.kids = await recursionFetchCommentsTree(comment.kids);
		}
		return comment;
	}))
	return promise;
}

module.exports = {recursionFetchCommentsTree};