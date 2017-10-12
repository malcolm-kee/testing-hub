import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

import Feature from './Feature';
import Header from './Header';
import SearchBar from './SearchBar';
import Spinner from './Spinner';

import preferenceData from './data/preferenceData';

class Catalog extends Component {
	state = {
		searchTerm: '',
		fav: preferenceData.getFavFeatures()
	};

	handleSearchTermChange = event => {
		this.setState({ searchTerm: event.target.value });
	};

	toggleFav = id => {
		if (this.state.fav.includes(id) === true) {
			const updatedFav = preferenceData.removeFavFeature(id);
			this.setState({ fav: updatedFav });
		} else {
			const updatedFav = preferenceData.addFavFeature(id);
			this.setState({ fav: updatedFav });
		}
	};

	render() {
		let sprintContent;
		let featureContent;

		if (this.props.sprints.length > 0) {
			sprintContent = this.props.sprints.map(sprint => {
				const urlTarget = `/sprint/${sprint.url}`;
				return (
					<MenuItem key={sprint.id}>
						<Link to={urlTarget} className="text-xlarge">
							{sprint.name}
						</Link>
					</MenuItem>
				);
			});
		} else {
			sprintContent = <Spinner />;
		}

		if (this.props.features.length > 0) {
			featureContent = this.props.features
				.filter(feature => feature.name.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0)
				.sort((a, b) => {
					if (this.state.fav.includes(a.id) && !this.state.fav.includes(b.id)) {
						return -1;
					} else if (!this.state.fav.includes(a.id) && this.state.fav.includes(b.id)) {
						return 1;
					}
					return 0;
				})
				.map(feature => {
					const pinned = this.state.fav.includes(feature.id);
					return (
						<div key={feature.id} className="col-xs-6 col-sm-4 col-md-3 pad-vertical">
							<Feature toggleFav={this.toggleFav} pinned={pinned} {...feature} />
						</div>
					);
				});
		} else {
			featureContent = <Spinner />;
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
							<Navbar inverse>
								<Nav className="text-xxlarge">
									<NavDropdown title="Sprint">{sprintContent}</NavDropdown>
								</Nav>
							</Navbar>
						</div>
						<div className="container">
							<SearchBar
								handleSearchTermChange={this.handleSearchTermChange}
								searchTerm={this.state.searchTerm}
							/>
							<div className="row">
								<div className="col-sm-12 col-xs-12">{featureContent}</div>
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
	sprints: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		})
	).isRequired
};

export default Catalog;
