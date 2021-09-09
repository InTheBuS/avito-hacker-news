import {call, put, takeEvery} from '@redux-saga/core/effects';
import {
	LOAD_NEW_STORIES_DATA,
	SET_NEW_STORIES_DATA_SUCCESS,
	SET_NEW_STORIES_DATA_ERROR,
	UPDATE_NEW_STORIES
} from '../../actions/HomeActions/HomeTypes';
import {
	checkForValidFetchStatusPost
} from '../../../utils/checkForValidFetchStatus/checkForValidFetchStatus';
import {getNewStories} from '../../../API/urls/urls';

// fetches

export let fetchToGetNewStories = () => {
	return checkForValidFetchStatusPost(getNewStories, null)
		.then(res => res.json())
		.catch(err => Promise.reject(err))
};

export let fetchForNewStoriesChanges = (hash) => {
	return checkForValidFetchStatusPost(getNewStories, hash)
		.then(res => res.json())
		.catch(err => Promise.reject(err))
};

// workers

export function* loadNewStoriesWorker() {
	try {
		const resolve = yield call(fetchToGetNewStories);
		yield put({type: SET_NEW_STORIES_DATA_SUCCESS, resolve});
	} catch (e) {
		yield put({type: SET_NEW_STORIES_DATA_ERROR});
	}
}

export function* updateNewStoriesWorker(action) {
	try {
		const resolve = yield call(fetchForNewStoriesChanges, action.hash);
		yield put({type: SET_NEW_STORIES_DATA_SUCCESS, resolve});
	} catch (e) {
		console.error(e);
	}
}

// watchers

export function* loadNewStoriesWatcher() {
	yield takeEvery(LOAD_NEW_STORIES_DATA, loadNewStoriesWorker);
}

export function* updateNewStoriesWatcher() {
	yield takeEvery(UPDATE_NEW_STORIES, updateNewStoriesWorker);
}