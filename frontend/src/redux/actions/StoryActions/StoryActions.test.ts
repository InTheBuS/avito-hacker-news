import {
	loadStory,
	setStorySuccess,
	setStoryError,
	loadStoryCommentsTree,
	setStoryCommentsTreeSuccess,
	setStoryCommentsTreeError,
	updateStoryComments
} from './StoryActions';
import {
	LOAD_STORY_DATA,
	LOAD_STORY_DEEP_COMMENTS_TREE,
	SET_STORY_DATA_ERROR,
	SET_STORY_DATA_SUCCESS,
	SET_STORY_DEEP_COMMENTS_TREE_ERROR,
	SET_STORY_DEEP_COMMENTS_TREE_SUCCESS,
	UPDATE_STORY_COMMENTS
} from './StoryTypes';

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

describe('Testing Story actions:', () => {
	test('should LOAD_STORY_DATA action', () => {
		const id = 'some id';
		const expectedAction = {
			type: LOAD_STORY_DATA,
			id: id,
		};

		expect(loadStory(id))
			.toEqual(expectedAction);
	});

	test('should create SET_STORY_DATA_SUCCESS action', () => {
		const someData = {
			notModified: false,
			Story: storyExample,
			StoryHash: 'some hash',
		};
		const expectedAction = {
			type: SET_STORY_DATA_SUCCESS,
			resolve: someData,
		};

		expect(setStorySuccess(someData))
			.toEqual(expectedAction);
	});

	test('should create SET_STORY_DATA_ERROR', () => {
		const expectedAction = {
			type: SET_STORY_DATA_ERROR,
		};

		expect(setStoryError())
			.toEqual(expectedAction);
	});

	test('should create LOAD_STORY_DEEP_COMMENTS_TREE action', () => {
		const commentIndex = 1;
		const ids = [1, 2, 3]
		const expectedAction = {
			type: LOAD_STORY_DEEP_COMMENTS_TREE,
			commentIndex: commentIndex,
			ids: ids,
		};

		expect(loadStoryCommentsTree(
				ids,
				commentIndex
			))
			.toEqual(expectedAction);
	});

	test('should create SET_STORY_DEEP_COMMENTS_TREE_SUCCESS action', () => {
		const commentIndex = 1;
		const resolve = [commentExample, commentExample];
		const expectedAction = {
			type: SET_STORY_DEEP_COMMENTS_TREE_SUCCESS,
			resolve: resolve,
			commentIndex: commentIndex,
		};

		expect(setStoryCommentsTreeSuccess(
				resolve,
				commentIndex))
			.toEqual(expectedAction);
	});

	test('should create SET_STORY_DEEP_COMMENTS_TREE_ERROR action', () => {
		const expectedAction = {
			type: SET_STORY_DEEP_COMMENTS_TREE_ERROR,
		};

		expect(setStoryCommentsTreeError())
			.toEqual(expectedAction);
	});

	test('should create UPDATE_STORY_COMMENTS action', () => {
		const id = 'some id';
		const hash = 'some hash';
		const deepComments = [1, 2, 3];
		const expectedAction = {
			type: UPDATE_STORY_COMMENTS,
			id: id,
			hash: hash,
			deepComments: deepComments,
		};

		expect(updateStoryComments(
				id,
				hash,
				deepComments))
			.toEqual(expectedAction);
	});
});