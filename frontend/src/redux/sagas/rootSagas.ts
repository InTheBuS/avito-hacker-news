import {all} from '@redux-saga/core/effects';
import {
	loadNewStoriesWatcher,
	updateNewStoriesWatcher
} from './HomeSagas/HomeSagas';
import {
	checkForUpdateCommentsWatcher,
	loadStoryCommentsTreeWatcher,
	loadStoryWatcher
}
	from './StorySagas/StorySagas';

export function* rootSaga() {
	yield all([
		loadNewStoriesWatcher(),
		loadStoryWatcher(),
		loadStoryCommentsTreeWatcher(),
		updateNewStoriesWatcher(),
		checkForUpdateCommentsWatcher(),
	]);
}