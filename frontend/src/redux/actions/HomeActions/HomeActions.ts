import {
	LOAD_NEW_STORIES_DATA,
	SET_NEW_STORIES_DATA_SUCCESS,
	SET_NEW_STORIES_DATA_ERROR,
	UPDATE_NEW_STORIES,
	IUpdateNewsStories,
	ISetNewStoriesError,
	ISetNewStoriesSuccess,
	ILoadNewStories
} from './HomeTypes';

export const loadNewStories = (): ILoadNewStories => {
	return {
		type: LOAD_NEW_STORIES_DATA,
	};
};


export const setNewStoriesSuccess = (resolve): ISetNewStoriesSuccess => {
	return {
		type: SET_NEW_STORIES_DATA_SUCCESS,
		resolve,
	};
};

export const setNewStoriesError = (): ISetNewStoriesError => {
	return {
		type: SET_NEW_STORIES_DATA_ERROR,
	};
};

export const updateNewsStories = (hash: string | null): IUpdateNewsStories => {
	return {
		type: UPDATE_NEW_STORIES,
		hash,
	};
};
