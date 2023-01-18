/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import Dashboard from './Dashboard';
import { getUserFromLocalStorage } from './utils';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: false,
		};
	}

	componentDidMount() {
		if (getUserFromLocalStorage() === null) {
			return window.location.replace('/home');
		}
		this.setState({ isLoggedIn: true });
	}

	render() {
		if (!this.state.isLoggedIn) return null;
		return <Dashboard />;
	}
}

export default App;
