import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Feature extends Component {
	handleToggleFav = event => {
		event.preventDefault();
		this.props.toggleFav(this.props.id);
	};

	render() {
		let favIcon;
		let pTitle;
		let bsClass;

		if (this.props.pinned === true) {
			favIcon = (
				<div className="fav-icon">
					<button type="button" onClick={this.handleToggleFav}>
						<span className="glyphicon glyphicon-heart text-xxxlarge" />
					</button>
				</div>
			);
		} else {
			favIcon = (
				<div className="fav-icon">
					<button type="button" onClick={this.handleToggleFav}>
						<span className="glyphicon glyphicon-heart-empty text-xxxlarge" />
					</button>
				</div>
			);
		}

		if (this.props.requireLogin) {
			bsClass = 'panel panel-info';
			pTitle = 'Private link';
		} else {
			bsClass = 'panel panel-default';
			pTitle = 'Public link';
		}

		return (
			<div className={bsClass} id={this.props.id}>
				<div className="panel-heading">
					<h3 className="panel-title">{pTitle}</h3>
				</div>
				<div className="panel-body">
					{favIcon}
					<h3 className="text-xxlarge">{this.props.name}</h3>
				</div>
				<div className="panel-footer">
					<div className="btn-group btn-group-justified">
						{this.props.links.map(link => (
							<a key={link.id} href={link.url} target="_blank" className="btn btn-primary text-xxlarge">
								{link.env}
							</a>
						))}
					</div>
				</div>
			</div>
		);
	}
}

Feature.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	requireLogin: PropTypes.bool.isRequired,
	links: PropTypes.arrayOf(
		PropTypes.shape({
			url: PropTypes.string.isRequired,
			env: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired
		})
	).isRequired,
	pinned: PropTypes.bool,
	toggleFav: PropTypes.func
};

Feature.defaultProps = {
	pinned: false,
	toggleFav: function noop() {}
};

export default Feature;
