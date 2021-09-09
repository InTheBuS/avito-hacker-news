import {StoryReducer} from './StoryReducer';
import {StoryStates} from '../../states/StoryStates/StoryStates';
import {
	LOAD_STORY_DATA,
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
	id: 2,
	parent: 1,
	text: 'some text',
	time: 1,
	comment: 'some comment',
};

describe('Story reducer:', () => {
	let data: StoryStates = {
		Story: null,
		StoryHash: '',
		isFetching: true,
		error: false,
		isFetchingComments: false,
	};
	beforeEach(() => {
		data = {
			Story: null,
			StoryHash: '',
			isFetching: true,
			error: false,
			isFetchingComments: false,
		};
	});

	test('should return Initial State:', () => {
		// @ts-ignore
		expect(StoryReducer(undefined, {type: undefined})).toEqual(data);
	});

	test('should make LOAD_STORY_DATA case:', () => {
		data.isFetching = true;
		data.error = false;

		const id = 'some id';

		expect(StoryReducer(
			undefined,
			{
				type: LOAD_STORY_DATA,
				id: id
			}))
			.toEqual(data);
	});

	test('should make SET_STORY_DATA_SUCCESS case if notModified = false and update state:', () => {
		const someHash = 'some hash';
		const resolve = {
			notModified: false,
			Story: storyExample,
			StoryHash: someHash,
		};

		data.isFetching = false;
		data.error = false;
		data.Story = storyExample;
		data.StoryHash = someHash;

		expect(StoryReducer(
			undefined,
			{
				type: SET_STORY_DATA_SUCCESS,
				resolve,
			}))
			.toEqual(data);
	});

	test('should make SET_STORY_DATA_SUCCESS case if notModified = true and return initial state:', () => {
		const someHash = 'some hash';
		const resolve = {
			notModified: true,
			Story: storyExample,
			StoryHash: someHash,
		};

		expect(StoryReducer(
			undefined,
			{
				type: SET_STORY_DATA_SUCCESS,
				resolve,
			}))
			.toEqual(data);
	});

	test('should make SET_STORY_DATA_ERROR case:', () => {
		data.isFetching = false;
		data.error = true;

		expect(StoryReducer(
			undefined,
			{type: SET_STORY_DATA_ERROR}))
			.toEqual(data);
	});

	test('should make SET_STORY_DEEP_COMMENTS_TREE_SUCCESS case:', () => {
		const resolve = [commentExample];
		const commentIndex = 1;

		data.Story = storyExample;
		data.Story.kids = [commentExample, commentExample];

		expect(StoryReducer(
			data,
			{
				type: SET_STORY_DEEP_COMMENTS_TREE_SUCCESS,
				resolve: resolve,
				commentIndex: commentIndex
			},
		))
			.toEqual(data);
	});
});