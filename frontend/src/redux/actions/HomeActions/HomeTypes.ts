import {Story} from '../../states/StoryStates/StoryStates';

export const LOAD_NEW_STORIES_DATA = 'LOAD_NEW_STORIES_DATA';
export const SET_NEW_STORIES_DATA_SUCCESS = 'SET_NEW_STORIES_DATA_SUCCESS';
export const SET_NEW_STORIES_DATA_ERROR = 'SET_NEW_STORIES_DATA_ERROR';

export const UPDATE_NEW_STORIES = 'UPDATE_NEW_STORIES';

export interface ILoadNewStories {
	type: typeof LOAD_NEW_STORIES_DATA,
}

export interface ISetNewStoriesSuccess {
	type: typeof SET_NEW_STORIES_DATA_SUCCESS,
	resolve: NewStoriesResolve,
}
export type NewStoriesResolve = {
	notModified: boolean,
	newStories: Story[],
	StoriesHash: string,
};

export interface ISetNewStoriesError {
	type: typeof SET_NEW_STORIES_DATA_ERROR,
}

export interface IUpdateNewsStories {
	type: typeof UPDATE_NEW_STORIES,
	hash: string | null,
}

export type IHomeActionTypes = ILoadNewStories | ISetNewStoriesSuccess | ISetNewStoriesError | IUpdateNewsStories;