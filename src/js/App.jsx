import React, { Component } from 'react';
import axios from 'axios';
// import preload from './data.json';
import Catalog from './Catalog';
import ErrorMessage from './ErrorMessage';

class App extends Component {
	state = {
		features: [],
		error: false,
		errorMessage: null
	};

	componentDidMount() {
		axios
			.get('/api/feature')
			.then(response => {
				this.setState({ features: response.data });
			})
			.catch(error => {
				this.setState({ error: true });
				this.setState({ errorMessage: JSON.stringify(error) });
			});
	}

	render() {
		let content;
		if (this.state.error) {
			content = <ErrorMessage errorMessage={this.state.errorMessage} />;
		} else {
			content = <Catalog features={this.state.features} />;
		}
		return <div className="app">{content}</div>;
	}
}
export default App;
