import {put, call} from 'redux-saga/effects';
import {
	checkForUpdateCommentsWorker, checkForUpdateStoryComments,
	fetchStory,
	fetchStoryCommentsDeepTree,
	loadStoryCommentsTreeWorker,
	loadStoryWorker
} from "./StorySagas";
import {
	SET_STORY_DATA_ERROR,
	SET_STORY_DATA_SUCCESS,
	SET_STORY_DEEP_COMMENTS_TREE_SUCCESS
} from "../../actions/StoryActions/StoryTypes";

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

const commentExample = {
	by: 'some by',
	id: 1,
	parent: 1,
	text: 'some text',
	time: 1,
	comment: 'some comment',
};

describe('Testing Story sagas:', () => {
	test('Testing loadStoryWorker. Should fetch success while getting a story:', () => {
		const action = {
			id: 'some id',
		};
		const resolve = {
			notModified: false,
			Story: storyExample,
			StoryHash: 'someHash',
		};

		const generator = loadStoryWorker(action);

		let callOutput = generator.next().value;
		let expectedCall = call(fetchStory, action.id);

		expect(callOutput)
			.toEqual(expectedCall);

		let putOutput = generator.next(resolve).value;
		let expectedPut = put({
			type: SET_STORY_DATA_SUCCESS,
			resolve,
		});

		expect(putOutput)
			.toEqual(expectedPut);
	});

	test('Testing loadStoryWorker. Should fetch error while getting a story:', () => {
		const action = {
			id: 'some id',
		};
		const error = new Error('error');

		const generator = loadStoryWorker(action);

		let callOutput = generator.next().value;
		let expectedCall = call(fetchStory, action.id);

		expect(callOutput)
			.toEqual(expectedCall);

		let putOutput = generator.throw(error).value;
		let expectedPut = put({
			type: SET_STORY_DATA_ERROR,
		});

		expect(putOutput)
			.toEqual(expectedPut);
	});

	test('Testing loadStoryCommentsTreeWorker. Should fetch success while getting a deep comments:', () => {
		const action = {
			ids: [1, 2, 3],
			commentIndex: 1,
		};

		const resolve = [commentExample, commentExample]

		const generator = loadStoryCommentsTreeWorker(action);

		let callOutput = generator.next().value;
		let expectedCall = call(fetchStoryCommentsDeepTree, action.ids)

		expect(callOutput)
			.toEqual(expectedCall);

		let putOutput = generator.next(resolve).value;
		let expectedPut = put({
			type: SET_STORY_DEEP_COMMENTS_TREE_SUCCESS,
			commentIndex: action.commentIndex,
			resolve: resolve,
		});

		expect(putOutput).
		toEqual(expectedPut);
	});

	test('Testing checkForUpdateCommentsWorker. Should fetch to check if Story comments modified:', () => {
		const action = {
			id: 'some id',
			hash: 'some hash',
			deepComments: [1,2,3]
		};
		const resolve = [commentExample, commentExample];

		const generator = checkForUpdateCommentsWorker(action);
		
		let firstPutOutput = generator.next().value
		let expectedFirstPutOutput = put(
			{
				type: LOAD_STORY_DEEP_COMMENTS_TREE_SET_FETCHING,
				isFetching: true,
			});

		expect(firstPutOutput).toEqual(expectedFirstPutOutput);
		
		let callOutput = generator.next().value;
		let expectedCall = call(checkForUpdateStoryComments, action.id, action.hash, action.deepComments);

		expect(callOutput).toEqual(expectedCall);

		let putOutput = generator.next(resolve).value;
		let expectedPut = put({
			type: SET_STORY_DATA_SUCCESS,
			resolve,
		});

		expect(putOutput)
			.toEqual(expectedPut);
	});
});
