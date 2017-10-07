import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import preload from './data.json';
import Catalog from './Catalog';
import Admin from './Admin';
import FeatureCreate from './FeatureCreate';
import FeatureConfig from './FeatureConfig';
import Sprint from './Sprint';
import SprintCreate from './SprintCreate';
import SprintConfig from './SprintConfig';
// import ErrorMessage from './ErrorMessage';
import PageNotFoundMessage from './PageNotFoundMessage';

import featureData from './data/featureData';
import sprintData from './data/sprintData';

class App extends Component {
	state = {
		features: [],
		sprints: [],
		error: false,
		errorMessage: null
	};

	componentDidMount() {
		this.refreshSprints();
		this.refreshFeatures();
	}

	refreshFeatures = () => {
		featureData
			.getAll()
			.then(features => {
				this.setState({ features });
			})
			.catch(() => {
				this.setState({ error: true });
				this.setState({ errorMessage: 'Error while getting features data' });
			});
	};

	refreshSprints = () => {
		sprintData
			.getAll()
			.then(sprints => {
				this.setState({ sprints });
			})
			.catch(() => {
				this.setState({ error: true });
				this.setState({ errorMessage: 'Error while getting sprints data' });
			});
	};

	render() {
		return (
			<BrowserRouter>
				<div className="app">
					<Switch>
						<Route exact path="/" component={() => <Catalog features={this.state.features} />} />
						<Route
							exact
							path="/admin"
							component={() => <Admin features={this.state.features} sprints={this.state.sprints} />}
						/>
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
						<Route
							path="/sprint/:url"
							component={props => (
								<Sprint
									url={props.match.params.url}
									features={this.state.features}
									refreshSprints={this.refreshSprints}
								/>
							)}
						/>
						<Route
							exact
							path="/sprint-create"
							component={() => (
								<SprintCreate refreshSprints={this.refreshSprints} features={this.state.features} />
							)}
						/>
						<Route
							path="/sprint-config/:id"
							component={props => {
								const selectedSprint = this.state.sprints.find(
									sprint => props.match.params.id === sprint.id
								);
								return (
									<SprintConfig
										sprint={selectedSprint}
										refreshSprints={this.refreshSprints}
										features={this.state.features}
									/>
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
