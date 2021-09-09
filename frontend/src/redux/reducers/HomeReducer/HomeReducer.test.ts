import {HomeReducer} from './HomeReducer';
import {HomeStates} from '../../states/HomeStates/HomeStates';
import {LOAD_NEW_STORIES_DATA, SET_NEW_STORIES_DATA_ERROR} from "../../actions/HomeActions/HomeTypes";

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

describe('Home reducer:', () => {
	let data: HomeStates = {
		newStories: null,
		StoriesHash: '',
		isFetching: true,
		error: false,
	};
	beforeEach(() => {
		data = {
			newStories: null,
			StoriesHash: '',
			isFetching: true,
			error: false,
		};
	});

	test('should return Initial State:', () => {
		// @ts-ignore
		expect(HomeReducer(undefined, {type: undefined}))
			.toEqual(data);
	});

	test('should make LOAD_NEW_STORIES_DATA case:', () => {
		data.isFetching = true;
		data.error = false;

		expect(HomeReducer(
			undefined,
			{type: LOAD_NEW_STORIES_DATA}))
			.toEqual(data);
	});

	test('should make SET_NEW_STORIES_DATA_SUCCESS case:', () => {
		const newStories = [storyExample];
		const StoriesHash = 'some hash';
		const notModified = false;

		data.isFetching = false;
		data.error = false;
		data.StoriesHash = StoriesHash;
		data.newStories = newStories;

		expect(HomeReducer(undefined, {
			type: "SET_NEW_STORIES_DATA_SUCCESS",
			resolve: {
				newStories: newStories,
				StoriesHash: StoriesHash,
				notModified: notModified,
			},
		})).toEqual(data);
	});

	test('should make SET_NEW_STORIES_DATA_ERROR case:', () => {
		data.isFetching = false;
		data.error = true;

		expect(HomeReducer(
			undefined,
			{type: SET_NEW_STORIES_DATA_ERROR}))
			.toEqual(data);
	});
});