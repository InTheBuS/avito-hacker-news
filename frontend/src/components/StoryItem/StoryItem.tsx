import React from 'react';
import styles from './StoryItem.module.css'
import {Link} from 'react-router-dom';
import {Story} from '../../redux/states/StoryStates/StoryStates';

interface Props {
	newsInfo: Story
}

const StoryItem: React.FC<Props> = ({newsInfo}) => {
	const publishDate = new Date(newsInfo.time * 1000).toLocaleDateString();

	return (
		<Link className={styles.news} to={`/story/${newsInfo.id}`}>
			<div>
				<h2 dangerouslySetInnerHTML={{__html: newsInfo.title}} />
			</div>
			<div className={styles.newsInformationContainer}>
				<div className={styles.newsAuthorContainer}>
					<div>Автор:</div>
					<div className={styles.newsInfo} dangerouslySetInnerHTML={{__html: newsInfo.by}} />
				</div>
				<div className={styles.newsRatingContainer}>
					<div>Рейтинг:</div>
					<div className={styles.newsInfo} dangerouslySetInnerHTML={{__html: newsInfo.score.toString()}} />
				</div>
				<div className={styles.newsPublishDateContainer} >
					<div>Дата создания:</div>
					<div className={styles.newsPublishDate} dangerouslySetInnerHTML={{__html: publishDate}}/>
				</div>
			</div>
		</Link>
	)
}

export default StoryItem;