import {call, put, takeEvery} from '@redux-saga/core/effects';
import {
	LOAD_STORY_DATA,
	SET_STORY_DATA_SUCCESS,
	SET_STORY_DATA_ERROR,
	SET_STORY_DEEP_COMMENTS_TREE_SUCCESS,
	LOAD_STORY_DEEP_COMMENTS_TREE,
	UPDATE_STORY_COMMENTS, LOAD_STORY_DEEP_COMMENTS_TREE_SET_FETCHING
} from '../../actions/StoryActions/StoryTypes';
import {checkForValidFetchStatus} from '../../../utils/checkForValidFetchStatus/checkForValidFetchStatus';
import {getStory, getStoryCommentsTree} from '../../../API/urls/urls';

// fetches

export const fetchStory = (id: string) => {
	return checkForValidFetchStatus(`${getStory}${id}`)
		.then(res => res.json())
		.catch(err => Promise.reject(err))
};

export const fetchStoryCommentsDeepTree = (id: string[] | number[]) => {
	return checkForValidFetchStatus(`${getStoryCommentsTree}${id}`)
		.then(res => res.json())
		.catch(err => Promise.reject(err))
};

export const checkForUpdateStoryComments = (id: string, hash: string | null, deepComments) => {
	let resultCommentsIds = ''
	if (deepComments) {
		deepComments.forEach((commentId) => {
			resultCommentsIds += `&deepComments[]=${commentId}`
		});
	}

	return checkForValidFetchStatus(`${getStory}${id}?hash=${hash}${resultCommentsIds}`)
		.then(res => res.json())
		.catch(err => Promise.reject(err))
};

// workers

export function* loadStoryWorker(action) {
	try {
		const resolve = yield call(fetchStory, action.id);
		yield put({type: SET_STORY_DATA_SUCCESS, resolve});
	} catch (e) {
		yield put({type: SET_STORY_DATA_ERROR});
	}
}

export function* loadStoryCommentsTreeWorker(action) {
	try {
		const resolve = yield call(fetchStoryCommentsDeepTree, action.ids);
		const commentIndex = action.commentIndex;
		yield put({type: SET_STORY_DEEP_COMMENTS_TREE_SUCCESS, resolve, commentIndex});
	} catch (e) {
		console.error(e);
	}
}

export function* checkForUpdateCommentsWorker(action) {
	yield put({type: LOAD_STORY_DEEP_COMMENTS_TREE_SET_FETCHING, isFetching: true})
	try {
		const resolve = yield call(checkForUpdateStoryComments, action.id, action.hash, action.deepComments)
		yield put({type: SET_STORY_DATA_SUCCESS, resolve})
	} catch (e) {
		console.error(e);
	} finally {
		yield put({type: LOAD_STORY_DEEP_COMMENTS_TREE_SET_FETCHING, isFetching: false})
	}
}

// watchers

export function* loadStoryWatcher() {
	yield takeEvery(LOAD_STORY_DATA, loadStoryWorker);
}

export function* loadStoryCommentsTreeWatcher() {
	yield takeEvery(LOAD_STORY_DEEP_COMMENTS_TREE, loadStoryCommentsTreeWorker);
}

export function* checkForUpdateCommentsWatcher() {
	yield takeEvery(UPDATE_STORY_COMMENTS, checkForUpdateCommentsWorker);
}