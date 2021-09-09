import React from 'react';
import styles from './StoryComments.module.css';
import {Comment} from '../../redux/states/StoryStates/StoryStates';
import {loadStoryCommentsTree} from '../../redux/actions/StoryActions/StoryActions';
import {useDispatch} from 'react-redux';
import RecursiveComments from './RecursiveComments/RecursiveComments';
import {Button} from 'react-bootstrap';

interface Props {
	kids: Comment,
	arrayIndex: number,
	handleAddOpenedComment: (number) => void,
	commentId: number,
}

const StoryComments: React.FC<Props> =
	({
		 kids,
		 arrayIndex,
		 handleAddOpenedComment,
		 commentId
	 }) => {
		const dispatch = useDispatch();

		if (!kids.kids) {
			return null;
		}

		const uploadComments = () => {
			handleAddOpenedComment(commentId);
			dispatch(loadStoryCommentsTree(kids.kids as number[], arrayIndex));
		}

		if (!kids.showAllComments) {
			return (
				<Button
					bsPrefix="super-btn"
					className={styles.uploadComments}
					onClick={uploadComments}>
					Загрузить комментарии
				</Button>
			);
		}

		return (
			<RecursiveComments comments={kids.kids as Comment[]} key={arrayIndex}/>
		);
	};

export default StoryComments;