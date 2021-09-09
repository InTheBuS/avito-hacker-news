import {
	SET_NEW_STORIES_DATA_ERROR,
	SET_NEW_STORIES_DATA_SUCCESS
} from '../../actions/HomeActions/HomeTypes';
import {
	fetchForNewStoriesChanges,
	fetchToGetNewStories,
	loadNewStoriesWorker,
	updateNewStoriesWorker
} from './HomeSagas';
import {put, call} from 'redux-saga/effects';

const storyExample = {
	by: 'some by',
	descendants: 1,
	id: 1,
	score: 1,
	time: 1,
	title: 'some title',
	type: 'some type',
	url: 'some url',
};

const resolve = {
	notModified: false,
	newStories: [storyExample, storyExample],
	StoriesHash: 'some hash',
};

describe(('Testing Home sagas:'), () => {
	test('Testing loadNewStoriesWorker. Should fetch success while getting new stories:', async () => {
		const generator = loadNewStoriesWorker();

		let callOutput = generator.next().value;
		let expectedCall = call(fetchToGetNewStories);

		expect(callOutput)
			.toEqual(expectedCall);

		let putOutput = generator.next(resolve).value;
		let expectedPut = put({
			type: SET_NEW_STORIES_DATA_SUCCESS,
			resolve: resolve,
		});

		expect(putOutput)
			.toEqual(expectedPut);
	});

	test('Testing loadNewStoriesWorker. Should fetch error while getting new stories:', () => {
		const error = new Error('error');

		const generator = loadNewStoriesWorker();
		let callOutput = generator.next().value;
		let expectedCall = call(fetchToGetNewStories);

		expect(callOutput)
			.toEqual(expectedCall);

		let putOutput = generator.throw(error).value;
		let expectedPut = put({
			type: SET_NEW_STORIES_DATA_ERROR,
		});

		expect(putOutput)
			.toEqual(expectedPut);
	});

	test('Testing updateNewStoriesWorker. Should update new stories:', () => {
		const action = {
			hash: 'some hash',
		};

		const generator = updateNewStoriesWorker(action);

		let callOutput = generator.next().value;
		let expectedCall = call(fetchForNewStoriesChanges, action.hash);

		expect(callOutput)
			.toEqual(expectedCall);

		let putOutput = generator.next(resolve).value;
		let expectedPut = put({
			type: SET_NEW_STORIES_DATA_SUCCESS,
			resolve: resolve,
		});

		expect(putOutput)
			.toEqual(expectedPut);
	});
});