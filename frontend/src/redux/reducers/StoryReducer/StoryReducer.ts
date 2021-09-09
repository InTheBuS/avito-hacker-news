import {StoryStates} from '../../states/StoryStates/StoryStates';
import {Reducer} from 'redux';
import {
	LOAD_STORY_DATA,
	SET_STORY_DATA_SUCCESS,
	SET_STORY_DATA_ERROR,
	SET_STORY_DEEP_COMMENTS_TREE_SUCCESS,
	IStoryActions,
	LOAD_STORY_DEEP_COMMENTS_TREE_SET_FETCHING
} from '../../actions/StoryActions/StoryTypes';

const initialState: StoryStates = {
	Story: null,
	StoryHash: '',
	isFetching: true,
	error: false,
	isFetchingComments: false,
};

export const StoryReducer: Reducer<StoryStates, IStoryActions> = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_STORY_DATA: {
			return {
				...state,
				isFetching: true,
				error: false
			};
		}

		case SET_STORY_DATA_SUCCESS: {
			if (action.resolve.notModified) {
				return {
					...state
				};
			}

			return {
				...state,
				Story: action.resolve.Story,
				StoryHash: action.resolve.StoryHash,
				isFetching: false,
				error: false,
			};
		}

		case SET_STORY_DATA_ERROR: {
			return {
				...state,
				isFetching: false,
				error: true,
			};
		}

		case LOAD_STORY_DEEP_COMMENTS_TREE_SET_FETCHING: {
			return {
				...state,
				isFetchingComments: action.isFetching
			}
		}



		case SET_STORY_DEEP_COMMENTS_TREE_SUCCESS: {
			if (!state.Story?.kids) {
				return {
					...state
				};
			}

			return {
				...state,
				Story: {
					...state.Story,
					kids: [
						...state.Story.kids.map((comment, index) => {
							if (index === action.commentIndex) {
								comment.kids = action.resolve
								comment.showAllComments = true
							}
							return comment
						}),
					]
				}
			};
		}

		default: {
			return {
				...state
			};
		}
	}
};