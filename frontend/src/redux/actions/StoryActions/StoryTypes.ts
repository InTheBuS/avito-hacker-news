import {Comment, Story} from "../../states/StoryStates/StoryStates";

export const LOAD_STORY_DATA = 'LOAD_STORY_DATA';
export const SET_STORY_DATA_SUCCESS = 'SET_STORY_DATA_SUCCESS';
export const SET_STORY_DATA_ERROR = 'SET_STORY_DATA_ERROR';

export const LOAD_STORY_DEEP_COMMENTS_TREE = 'LOAD_DEEP_COMMENTS_TREE';
export const SET_STORY_DEEP_COMMENTS_TREE_SUCCESS = 'SET_DEEP_COMMENTS_TREE_SUCCESS';
export const SET_STORY_DEEP_COMMENTS_TREE_ERROR = 'SET_DEEP_COMMENTS_TREE_ERROR';

export const UPDATE_STORY_COMMENTS = 'UPDATE_STORY_COMMENTS'
export const LOAD_STORY_DEEP_COMMENTS_TREE_SET_FETCHING = 'LOAD_STORY_DEEP_COMMENTS_TREE_SET_FETCHING'

export interface ILoadStory {
	type: typeof LOAD_STORY_DATA,
	id: string,
}

export interface ISetStorySuccess {
	type: typeof SET_STORY_DATA_SUCCESS,
	resolve: StoryResolve
}
export type StoryResolve = {
	notModified: boolean,
	Story: Story,
	StoryHash: string,
}

export interface ISetStoryError {
	type: typeof SET_STORY_DATA_ERROR,
}

export interface ILoadStoryCommentsTree {
	type: typeof LOAD_STORY_DEEP_COMMENTS_TREE,
	ids: number[],
	commentIndex: number,
}

export interface ISetStoryCommentsTreeSuccess {
	type: typeof SET_STORY_DEEP_COMMENTS_TREE_SUCCESS,
	resolve: Comment[],
	commentIndex: number
}


export interface ISetStoryCommentsTreeError {
	type: typeof SET_STORY_DEEP_COMMENTS_TREE_ERROR,
}

export interface IUpdateStoryComments {
	type: typeof UPDATE_STORY_COMMENTS,
	id: string,
	hash: string,
	deepComments: string[] | number[],
}

export interface ILoadStoryDeepCommentsTreeSetFetching {
	type: typeof LOAD_STORY_DEEP_COMMENTS_TREE_SET_FETCHING,
	isFetching: boolean,
}

export type IStoryActions = ILoadStory |
	ISetStorySuccess |
	ISetStoryError |
	ILoadStoryCommentsTree |
	ISetStoryCommentsTreeSuccess |
	ISetStoryCommentsTreeError |
	IUpdateStoryComments |
	ILoadStoryDeepCommentsTreeSetFetching
