import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Feature from './Feature';
import Header from './Header';
import SearchBar from './SearchBar';
import Spinner from './Spinner';

class Sprint extends Component {
	state = {
		name: '',
		url: '',
		desc: '',
		features: [],
		searchTerm: '',
		error: ''
	};

	componentWillMount() {
		axios
			.get(`/api/sprint/url/${this.props.url}`)
			.then(response => {
				this.setState(response.data.sprints[0]);
			})
			.catch(() => {
				this.setState({
					error: 'Sorry, we have problem getting your sprint page.'
				});
			});
	}

	handleSearchTermChange = event => {
		this.setState({ searchTerm: event.target.value });
	};

	render() {
		let content;
		if (this.state.error) {
			content = (
				<div className="alert alert-danger">
					<p className="text-xlarge">{this.state.error}</p>
				</div>
			);
		} else if (this.props.features.length > 0) {
			content = this.props.features
				.filter(feature => this.state.features.some(sprintFeature => sprintFeature.featureId === feature.id))
				.filter(feature => feature.name.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0)
				.map(feature => (
					<div key={feature.id} className="col-xs-6 col-sm-4 col-md-3 pad-vertical">
						<Feature {...feature} />
					</div>
				));
		} else {
			content = <Spinner />;
		}

		return (
			<div>
				<Header />
				<div className="container-fluid">
					<div className="row">
						<header className="page-header">
							<h1>{this.state.name}</h1>
							<p>{this.state.desc}</p>
						</header>
						<div className="container">
							<SearchBar
								handleSearchTermChange={this.handleSearchTermChange}
								searchTerm={this.state.searchTerm}
							/>
							<div className="row">
								<div className="col-sm-12 col-xs-12">{content}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Sprint.propTypes = {
	url: PropTypes.string.isRequired,
	features: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired
};

export default Sprint;
