import React, {useEffect, useState} from 'react';
import styles from './Home.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {loadNewStories, updateNewsStories} from '../../redux/actions/HomeActions/HomeActions';
import {AppState} from '../../redux/states/AppStates';
import StoryItem from '../../components/StoryItem/StoryItem';
import {Button} from 'react-bootstrap';
import HomePageSkeleton from '../../components/Skeletons/HomePageSkeleton/HomePageSkeleton';

const Home: React.FC = () => {
	const dispatch = useDispatch();
	const [buttonFixedBottom, setButtonFixedBottom] = useState(false);
	const data = useSelector(({homeReducer}: AppState) => homeReducer);

	/**
	 * Функция, которая изменяет местоположение кнопки
	 */
	function changeButtonOrResize() {
		if ((window.innerWidth || document.documentElement.clientWidth ||
			document.body.clientWidth) < 950) {
			setButtonFixedBottom(true);
			return;
		}
		setButtonFixedBottom(false);
	}

	const reloadStories = () => {
		dispatch(loadNewStories());
	};

	const checkForUpdateStories = () => {
		dispatch(updateNewsStories(data.StoriesHash));
	};


	useEffect(() => {
		window.addEventListener("resize", changeButtonOrResize);
		return () => {
			window.removeEventListener("resize", changeButtonOrResize);
		};
	}, []);

	useEffect(() => {
		changeButtonOrResize();
		if (!data.newStories) {
			dispatch(loadNewStories());
		}
	}, [data.newStories]);

	useEffect(() => {
		const handleUpdateInterval = setInterval(checkForUpdateStories, 60000);
		return () => {
			clearInterval(handleUpdateInterval);
		};
	}, [data.StoriesHash]);

	/**
	 * Вызов скелетона
	 */
	if (data.isFetching) {
		const arrayToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
			return (
				<HomePageSkeleton key={item}/>
			);
		});
		return (
			<div className={styles.StoriesWrapper}>
				{arrayToShow}
			</div>
		);
	}

	if (data.error || !data.newStories) {
		return (
			<h1>Не удалось загрузить новости, попробуйте перезагрузить страницу!</h1>
		);
	}

	const storiesToShow = data?.newStories?.map((news, index) => {
		return (
			<StoryItem
				newsInfo={news}
				key={index}/>
		);
	});

	return (
		<>
			<div className={styles.HomeWrapper}>
				<Button
					bsPrefix="super-btn"
					className={`${styles.reloadNewsButton} ${buttonFixedBottom && styles.reloadNewsButtonFixedBottom}`}
					onClick={reloadStories}>
					Перезагрузить
				</Button>
			</div>
			<div className={styles.StoriesWrapper}>
				{storiesToShow}
			</div>
		</>
	)
}

export default Home;