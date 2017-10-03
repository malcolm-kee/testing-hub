import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Feature from './Feature';
import Header from './Header';
import SearchBar from './SearchBar';
import Spinner from './Spinner';

class Catalog extends Component {
	state = {
		searchTerm: ''
	};

	handleSearchTermChange = event => {
		this.setState({ searchTerm: event.target.value });
	};

	render() {
		let content;
		if (this.props.features.length > 0) {
			content = this.props.features
				.filter(feature => feature.name.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0)
				.map(feature => (
					<div key={feature.id} className="col-xs-6 col-sm-4 col-md-3 pad-vertical">
						<Feature pathname={location.pathname} {...feature} />
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
							<h1>Testing Links</h1>
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

Catalog.propTypes = {
	features: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
	location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired
};

const CatalogWithRouter = withRouter(Catalog);

export default CatalogWithRouter;
