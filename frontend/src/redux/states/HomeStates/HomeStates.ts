import {Story} from '../StoryStates/StoryStates';

export type HomeStates = {
	newStories: Story[] | null,
	StoriesHash: null | string,
	isFetching: boolean,
	error: boolean,
};

