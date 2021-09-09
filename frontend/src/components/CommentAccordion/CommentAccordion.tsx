import React from 'react';
import {Comment} from '../../redux/states/StoryStates/StoryStates';
import Accordion from 'react-bootstrap/Accordion';
import AccordionHeader from '../AccordionItems/AccordionHeader/AccordionHeader';
import {localeOptions} from './constants';
import styles from './CommentAccordion.module.css';

interface Props {
	comment: Comment,
	child: React.ReactElement | null,
}

const CommentAccordion: React.FC<Props> = ({comment, child}) => {
	const publishDate = new Date(comment.time * 1000).toLocaleString([], localeOptions)

	return (
		<Accordion defaultActiveKey="0" flush className={styles.CommentAccordionContainer}>
			<Accordion.Item eventKey="0" style={{backgroundColor: '#efefed'}}>
				<AccordionHeader eventKey='0'
				                 children={`Автор: ${comment.by} Опубликовано: ${publishDate}`}/>
				<Accordion.Body style={{backgroundColor: '#efefed'}}>
					<div className={styles.CommentContainer}>
						<div dangerouslySetInnerHTML={{__html: comment.text}}/>
					</div>
					{child}
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
};

export default CommentAccordion;
