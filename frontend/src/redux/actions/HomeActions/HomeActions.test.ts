import {
	loadNewStories,
	setNewStoriesError,
	setNewStoriesSuccess,
	updateNewsStories
} from './HomeActions';
import {
	LOAD_NEW_STORIES_DATA,
	SET_NEW_STORIES_DATA_ERROR,
	SET_NEW_STORIES_DATA_SUCCESS,
	UPDATE_NEW_STORIES
} from './HomeTypes';

describe('Testing Home actions:', () => {
	test('should create LOAD_NEW_STORIES_DATA action', () => {
		const expectedAction = {
			type: LOAD_NEW_STORIES_DATA,
		};

		expect(loadNewStories())
			.toEqual(expectedAction);
	});

	test('should create SET_NEW_STORIES_DATA_SUCCESS action', () => {
		const someData = 'some data';
		const expectedAction = {
			type: SET_NEW_STORIES_DATA_SUCCESS,
			resolve: someData,
		};

		expect(setNewStoriesSuccess(someData))
			.toEqual(expectedAction);
	});

	test('should create SET_NEW_STORIES_DATA_ERROR action', () => {
		const expectedAction = {
			type: SET_NEW_STORIES_DATA_ERROR,
		};

		expect(setNewStoriesError())
			.toEqual(expectedAction);
	});

	test('should create UPDATE_NEW_STORIES action', () => {
		const hash = 'some hash';

		const expectedAction = {
			type: UPDATE_NEW_STORIES,
			hash: hash,
		};

		expect(updateNewsStories(hash))
			.toEqual(expectedAction);
	});
});