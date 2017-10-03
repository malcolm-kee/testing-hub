import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
// import preload from './data.json';
import Catalog from './Catalog';
import Admin from './Admin';
import FeatureCreate from './FeatureCreate';
import FeatureConfig from './FeatureConfig';
// import ErrorMessage from './ErrorMessage';
import PageNotFoundMessage from './PageNotFoundMessage';

class App extends Component {
	state = {
		features: [],
		error: false,
		errorMessage: null
	};

	componentDidMount() {
		this.refreshFeatures();
	}

	refreshFeatures = () => {
		axios
			.get('/api/feature')
			.then(response => {
				this.setState({ features: response.data });
			})
			.catch(error => {
				this.setState({ error: true });
				this.setState({ errorMessage: JSON.stringify(error) });
			});
	};

	render() {
		return (
			<BrowserRouter>
				<div className="app">
					<Switch>
						<Route exact path="/" component={() => <Catalog features={this.state.features} />} />
						<Route exact path="/admin" component={() => <Admin features={this.state.features} />} />
						<Route
							exact
							path="/feature-create"
							component={() => <FeatureCreate refreshFeatures={this.refreshFeatures} />}
						/>
						<Route
							path="/feature-config/:id"
							component={props => {
								const selectedFeature = this.state.features.find(
									feature => props.match.params.id === feature.id
								);
								return (
									<FeatureConfig feature={selectedFeature} refreshFeatures={this.refreshFeatures} />
								);
							}}
						/>
						<Route component={PageNotFoundMessage} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}
export default App;