import {
	LOAD_STORY_DATA,
	SET_STORY_DATA_SUCCESS,
	SET_STORY_DATA_ERROR,
	LOAD_STORY_DEEP_COMMENTS_TREE,
	SET_STORY_DEEP_COMMENTS_TREE_SUCCESS,
	SET_STORY_DEEP_COMMENTS_TREE_ERROR,
	UPDATE_STORY_COMMENTS,
	ILoadStory,
	ISetStorySuccess,
	ISetStoryError,
	ILoadStoryCommentsTree,
	ISetStoryCommentsTreeSuccess,
	ISetStoryCommentsTreeError,
	IUpdateStoryComments,
	StoryResolve, LOAD_STORY_DEEP_COMMENTS_TREE_SET_FETCHING
} from './StoryTypes';
import {Comment} from '../../states/StoryStates/StoryStates';

export const loadStory = (id: string): ILoadStory => {
	return {
		type: LOAD_STORY_DATA,
		id,
	};
};

export const setStorySuccess = (resolve: StoryResolve): ISetStorySuccess => {
	return {
		type: SET_STORY_DATA_SUCCESS,
		resolve,
	};
};

export const setStoryError = (): ISetStoryError => {
	return {
		type: SET_STORY_DATA_ERROR,
	};
};

export const loadStoryCommentsTree = (ids: number[], commentIndex: number): ILoadStoryCommentsTree => {
	return {
		type: LOAD_STORY_DEEP_COMMENTS_TREE,
		ids,
		commentIndex,
	}
}

export const setStoryCommentsTreeSuccess = (resolve: Comment[], commentIndex: number): ISetStoryCommentsTreeSuccess => {
	return {
		type: SET_STORY_DEEP_COMMENTS_TREE_SUCCESS,
		resolve,
		commentIndex,
	}
}


export const setStoryCommentsTreeError = (): ISetStoryCommentsTreeError => {
	return {
		type: SET_STORY_DEEP_COMMENTS_TREE_ERROR,
	}
}

export const updateStoryComments = (id: string, hash: string, deepComments: string[] | number[]): IUpdateStoryComments => {
	return {
		type: UPDATE_STORY_COMMENTS,
		id,
		hash,
		deepComments,
	}
}

export const loadStoryDeepCommentsTreeSetFetching = (isFetching) => {
	return {
		type: LOAD_STORY_DEEP_COMMENTS_TREE_SET_FETCHING,
		isFetching,
	}
}