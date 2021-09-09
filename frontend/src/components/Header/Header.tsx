import React from 'react';
import CSS from 'csstype';
import styles from './Header.module.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/cjs/Container';

const stylesHeaderText: CSS.Properties = {
	textDecoration: 'none',
	color: 'white',
	transition: 'color .2s',
	fontSize: '30px',
}

const Header: React.FC = () => {
	return (
		<Navbar className={styles.HeaderContainer} fixed="top">
			<Container className={styles.Header}>
				<Navbar.Brand style={stylesHeaderText} href='/'>
					Hacker News
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
}

export default Header;