import {
	applyMiddleware,
	combineReducers,
	createStore,
	Store,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {AppState} from './states/AppStates';
import {rootSaga} from './sagas/rootSagas';
import {HomeReducer} from './reducers/HomeReducer/HomeReducer';
import {StoryReducer} from './reducers/StoryReducer/StoryReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
	homeReducer: HomeReducer,
	storyReducer: StoryReducer,
});

function configureStore(): Store<AppState> {
	return createStore(rootReducer, undefined, applyMiddleware(sagaMiddleware));
}

export default configureStore();

sagaMiddleware.run(rootSaga);
