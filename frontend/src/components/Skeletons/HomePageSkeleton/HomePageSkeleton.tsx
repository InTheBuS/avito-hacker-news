import React from 'react';
import styles from '../../../pages/Home/Home.module.css';
import skeletonStyles from './HomePageSkeleton.module.css'
import storyItemStyles from '../../StoryItem/StoryItem.module.css';
import SkeletonElement from '../SkeletonElement';

const HomePageSkeleton: React.FC = () => {
	return (
		<div className={styles.StoriesWrapper}>
			<div className={storyItemStyles.news}>
				<div className={skeletonStyles.skeletonStoryTitleContainer}>
					<SkeletonElement type={'title'} size={'large'}/>
					<SkeletonElement type={'title'} size={'medium'}/>
				</div>
				<div className={skeletonStyles.skeletonBodyContainer}>
					<div className={skeletonStyles.skeletonBodyOptionContainer}>
						<SkeletonElement type={'text'} size={'large'}/>
						<SkeletonElement type={'text'} size={'large'}/>
					</div>
					<div className={skeletonStyles.skeletonBodyOptionContainer}>
						<SkeletonElement type={'text'} size={'large'}/>
						<SkeletonElement type={'text'} size={'small'}/>
					</div>
					<div className={skeletonStyles.skeletonBodyOptionContainer}>
						<SkeletonElement type={'text'} size={'large'}/>
						<SkeletonElement type={'text'} size={'medium'}/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePageSkeleton;