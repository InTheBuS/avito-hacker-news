const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const bodyParser = require('body-parser');
const md5 = require('md5');

const {fetchOneStory, createArrayOfPromisesByIds, fetchArrayOfPromises} = require('./utils/fetchItems');
const {recursionFetchCommentsTree} = require('./utils/recursiveFetch');
const {numberOfNews} = require('./constants/constants');
const {hackerNewsNewStoriesUrl} = require('./constants/urls')

const PORT = '5000';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true,
}));

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.listen(PORT);

app.post('/stories', async (req, res) => {
	let StoriesHash = null;

	const fetchForNewStoriesIds = await fetch(hackerNewsNewStoriesUrl)
		.then(res => res.json())
		.catch(err => {
			console.error(err)
			res.status(500).send({
				error: true,
				message: 'Не удалось загрузить список новостей',
			});
		})
		.then(resolve => {
			const hundredStories = resolve.slice(0, numberOfNews)
			StoriesHash = md5(hundredStories)
			return hundredStories;
		})
	if (req.body.hash === StoriesHash) {
		res.status(200).send({
			notModified: true,
		});
		return;
	}

	const storiesPromises = createArrayOfPromisesByIds(fetchForNewStoriesIds);
	const newStories = await fetchArrayOfPromises(storiesPromises)
		.catch(e => {
			console.error(e)
			res.status(200).send({error: true, message: 'Server error'})
			return;
		})

	res.status(200).json({newStories, StoriesHash});
});


app.get('/story/:id', async (req, res) => {
	const id = req.params.id;
	const queryHash = req.query.hash;
	const deepComments = req.query.deepComments;
	let StoryHash = null;
	const fetchStory = await fetchOneStory(id)
		.catch(err => {
			console.error(err);
		});

	if (!fetchStory || fetchStory.type !== 'story') {
		res.status(200).send({error: true, message: 'По данному ID находится объект не с типом story'});
		return;
	}
	StoryHash = md5(fetchStory.descendants);


	if (StoryHash === queryHash) {
		res.status(200).send({
			notModified: true,
		});
		return;
	}

	if (deepComments && deepComments.length > 0) {
		const comments = fetchStory.kids.map((kid) => {
			if (deepComments.includes(`${kid}`)) {
				return recursionFetchCommentsTree([kid])
					.then(res => {
						let resolve = res[0];
						resolve.showAllComments = true;
						return resolve;
					})
			}
			return fetchOneStory(kid);
		})

		fetchStory.kids = await fetchArrayOfPromises(comments)
			.catch(e => {
				console.error(e);
				res.status(200).send({error: true, message: 'Server error'});
				return;
			})

	} else if (fetchStory.kids) {
		const comments = await createArrayOfPromisesByIds(fetchStory.kids);
		fetchStory.kids = await fetchArrayOfPromises(comments)
			.catch(e => {
				console.error(e);
				res.status(200).send({error: true, message: 'Server error'});
				return;
			})
	}

	res.status(200).json({
		Story: fetchStory,
		StoryHash: StoryHash,
	});
});

app.get('/comment/tree/:id', async (req, res) => {
	const id = req.params.id.split(',');
	const result = await recursionFetchCommentsTree(id);

	res.status(200).json(result);
});

app.use((req, res) => {
	res.status(404).send('Page not found!');
});
