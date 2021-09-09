import React from 'react';
import {Comment} from '../../../redux/states/StoryStates/StoryStates';
import CommentAccordion from '../../CommentAccordion/CommentAccordion';
import styles from './RecursiveComments.module.css'

interface Props {
	comments: Comment[],
}

const RecursiveComments: React.FC<Props> = ({comments}) => {
	const commentsToShow = comments.map((comment, index) => {
		if (comment.kids) {
			return (
				<CommentAccordion
					comment={comment}
					key={index}
					child={<RecursiveComments comments={comment.kids as Comment[]}/>}
				/>
			);
		}

		return (
			<CommentAccordion
				comment={comment}
				child={null}
				key={index}/>
		);
	});

	return (
		<div className={styles.commentContainer} style={{marginLeft: 10}}>
			{commentsToShow}
		</div>
	);
};
export default RecursiveComments;