import React from 'react';
import styles from './SkeletonElements.module.css';

interface Props {
	type: string,
	size: string,
}

const SkeletonElement: React.FC<Props> = ({type, size}) => {
	return (
		<div className={`${styles.skeleton} ${styles[type]} ${styles[size]}`} />
	);
};

export default SkeletonElement;