import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Feature from './Feature';
import Header from './Header';
import SearchBar from './SearchBar';
import Spinner from './Spinner';

class Admin extends Component {
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
						<Feature editMode {...feature} />
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
							<h1>Administration</h1>
						</header>
						<div className="container">
							<SearchBar
								handleSearchTermChange={this.handleSearchTermChange}
								searchTerm={this.state.searchTerm}
							/>
							<div className="row">
								<div className="panel panel-default">
									<div className="panel-body">
										<div className="btn-toolbar">
											<div className="btn-group">
												<Link to="/feature-create" className="btn btn-success">
													<span className="glyphicon glyphicon-plus text-large" />
													&nbsp;Add a new link
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
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

Admin.propTypes = {
	features: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired
};

export default Admin;
