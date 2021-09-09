export type StoryStates = {
	Story: Story | null,
	StoryHash: string,
	isFetching: boolean,
	error: boolean,
	isFetchingComments: boolean,
};
export type Story = {
	by: string,
	descendants: number,
	id: number,
	kids?: number[] | Comment[],
	score: number,
	time: number,
	title: string,
	type: string,
	url: string,
	error?: boolean,
	message?: string,
};
export type Comment = {
	by: string,
	id: number,
	kids?: number[] | Comment[],
	parent: number,
	text: string,
	time: number,
	comment: string
	showAllComments?: boolean,
};
