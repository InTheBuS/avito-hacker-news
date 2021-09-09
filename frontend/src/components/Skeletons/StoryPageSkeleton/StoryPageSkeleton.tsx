import React from 'react';
import SkeletonElement from '../SkeletonElement';
import styles from '../../../pages/Story/Story.module.css';
import skeletonStyles from './StoryPageSkeleton.module.css';

const StoryPageSkeleton: React.FC = () => {
	return (
		<div className={skeletonStyles.skeletonWrapper}>
			<SkeletonElement size={'halfOfSmall'} type={'bigTitle'}/>
			<div className={styles.StoryContainer}>
				<SkeletonElement size={'medium'} type={'bigTitle'}/>
					<div className={skeletonStyles.infoContainer}>
						<div className={skeletonStyles.info}>
							<SkeletonElement type={'text'} size={'ultraSmall'}/>
							<SkeletonElement type={'text'} size={'xUltraSmall'}/>
						</div>
						<div className={skeletonStyles.info}>
							<SkeletonElement type={'text'} size={'ultraSmall'}/>
							<SkeletonElement type={'text'} size={'ultraSmall'}/>
						</div>
						<div className={skeletonStyles.info}>
							<SkeletonElement type={'text'} size={'xUltraSmall'}/>
							<SkeletonElement type={'text'} size={'ultraSmall'}/>
						</div>
						<div className={skeletonStyles.info}>
							<SkeletonElement type={'text'} size={'xUltraSmall'}/>
							<SkeletonElement type={'text'} size={'xUltraSmall'}/>
						</div>
				</div>
			</div>
		</div>
	);
};

export default StoryPageSkeleton;