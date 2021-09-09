import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Story from './pages/Story/Story';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
	return (
		<Router>
			<div className='App'>
				<Header/>
				<div className='AppBody'>
					<Switch>
						<Route path='/' exact component={Home}/>
						<Route path='/story/:id' component={Story} />
						<Route component={NotFound}/>
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
