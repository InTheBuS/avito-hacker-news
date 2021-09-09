import {HomeStates} from './HomeStates/HomeStates';
import {StoryStates} from './StoryStates/StoryStates';

export interface AppState {
	homeReducer: HomeStates,
	storyReducer: StoryStates,
}