import React from 'react';
import {Link} from 'react-router-dom';
import styles from './NotFound.module.css'

const NotFound: React.FC = () => {
	return (
		<div>
			<h1 className={styles.Title}>
				Page not found!
			</h1>
			<Link className={styles.LinkToHome} to='/'>Go to Home page</Link>
		</div>
	)
}

export default NotFound;