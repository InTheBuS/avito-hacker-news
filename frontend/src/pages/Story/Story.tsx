import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../redux/states/AppStates';
import styles from './Story.module.css';
import {
	loadStory,
	updateStoryComments
} from '../../redux/actions/StoryActions/StoryActions';
import StoryComments from '../../components/StoryComments/StoryComments';
import StoryPageSkeleton from '../../components/Skeletons/StoryPageSkeleton/StoryPageSkeleton';
import CommentAccordion from '../../components/CommentAccordion/CommentAccordion';

type StoryParams = {
	id: string
};

const Story: React.FC = () => {
	const dispatch = useDispatch();

	const data = useSelector(({storyReducer}: AppState) => storyReducer);

	const loader = data.isFetchingComments && <div className={styles.backgroundLoader}/>

	const [openedComments, setOpenedComments] = useState<number[]>([]);
	const handleAddOpenedComment = (id: number) => {
		setOpenedComments([...openedComments, id]);
	};

	const checkForCommentsUpdate = () => {
		dispatch(updateStoryComments(id, data.StoryHash, openedComments));
	};

	const forceReloadComments =  async () => {
		await dispatch(updateStoryComments(id, 'empty', openedComments))
	}

	const {id} = useParams<StoryParams>();

	useEffect(() => {
		dispatch(loadStory(id));
	}, [id]);

	useEffect(() => {
		const HandleUpdateInterval = setInterval(checkForCommentsUpdate, 60000);
		return () => {
			clearInterval(HandleUpdateInterval);
		};
	}, [id, data.StoryHash, openedComments.length]);

	if (data.isFetching) {
		return (
			<StoryPageSkeleton/>
		);
	}

	/**
	 * Проверка на подходящий тип истории
	 */
	if (!data?.Story || data?.Story?.error) {
		return (
			<div>
				<h1 dangerouslySetInnerHTML={{__html: `${data?.Story?.message}`}}/>
				<Link className={styles.backToHome} to='/'><h2>Вернуться на главную</h2></Link>
			</div>
		);
	}

	/**
	 * Проверка и компиляция комментариев
	 */
	const commentsToShow = data.Story.kids?.map((comment, index) => {
		return (
			<CommentAccordion
				key={index}
				comment={comment}
				child={comment.kids
					? <StoryComments
						commentId={comment.id}
						handleAddOpenedComment={handleAddOpenedComment}
						kids={comment}
						arrayIndex={index}/>
					: null}/>
		);
	});

	const updateComments = data.Story?.kids &&
		<button
			className={styles.updateCommentsButton}
			onClick={forceReloadComments}>
			Обновить комментарии
		</button>;

	const publishDate = new Date(data.Story.time * 1000).toLocaleDateString()

	return (
		<>
			<div className={styles.buttonWrapper}>
				<Link className={styles.backToHome} to='/'><h2>Вернуться на главную</h2></Link>
				{updateComments}
			</div>
			<div className={styles.StoryContainer}>
				<h1 dangerouslySetInnerHTML={{__html: data.Story.title}}/>
				<div className={styles.StoryInformation} >
					<div dangerouslySetInnerHTML={{__html: `Автор: ${data.Story.by}`}}/>
					<div
						dangerouslySetInnerHTML={{__html: `Дата создания: ${publishDate}`}}/>
					<div dangerouslySetInnerHTML={{__html: `Количество комментариев: ${data.Story.descendants}`}}/>
					<div className={styles.StoryNewsLinkContainer}>
						<div>Ссылка на новость:&nbsp;</div>
						<a target='_blank' rel='noreferrer' href={data.Story.url}
						   dangerouslySetInnerHTML={{__html: data.Story.url}}/>
					</div>
				</div>
			</div>
			<div  className={styles.commentsWrapper}>
				{loader}
				{commentsToShow}
			</div>
		</>
	);
};

export default Story;
