import {HomeStates} from '../../states/HomeStates/HomeStates';
import {Reducer} from 'redux';
import {
	LOAD_NEW_STORIES_DATA,
	SET_NEW_STORIES_DATA_SUCCESS,
	SET_NEW_STORIES_DATA_ERROR,
	IHomeActionTypes
} from '../../actions/HomeActions/HomeTypes';

const initialState: HomeStates = {
	newStories: null,
	StoriesHash: '',
	isFetching: true,
	error: false,
};

export const HomeReducer: Reducer<HomeStates, IHomeActionTypes> = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_NEW_STORIES_DATA: {
			return {
				...state,
				isFetching: true,
				error: false,
			};
		}

		case SET_NEW_STORIES_DATA_SUCCESS: {
			if (action.resolve.notModified) {
				return {...state};
			}
			return {
				...state,
				newStories: action.resolve.newStories,
				StoriesHash: action.resolve.StoriesHash,
				isFetching: false,
				error: false,
			};
		}

		case SET_NEW_STORIES_DATA_ERROR: {
			return {
				...state,
				isFetching: false,
				error: true
			};
		}

		default: {
			return {
				...state
			};
		}
	}
};
