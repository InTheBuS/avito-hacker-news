import React from 'react';
import {useAccordionButton} from 'react-bootstrap/AccordionButton';
import styles from './AccordionHeader.module.css'

interface Props {
	children: string,
	eventKey: string
}

const AccordionHeader: React.FC<Props> = ({children, eventKey}) => {
	const decoratedOnClick = useAccordionButton(eventKey);

	return (
		<div className={styles.AccordionHeaderContainer}
		     onClick={decoratedOnClick}>
			<div
				className={styles.AccordionHeaderLeft}
				dangerouslySetInnerHTML={{__html: children}}
			/>
			<div className={styles.AccordionHeaderRight}>
				+
			</div>
		</div>
	);
}

export default AccordionHeader;