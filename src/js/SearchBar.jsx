import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
	state = {
		searchBar: null
	};

	componentDidMount() {
		this.searchBar.focus();
	}

	render() {
		return (
			<div className="row">
				<div className="form-group">
					<input
						ref={input => {
							this.searchBar = input;
						}}
						onChange={this.props.handleSearchTermChange}
						value={this.props.searchTerm}
						type="text"
						className="form-control input-lg"
						placeholder="Search here"
					/>
				</div>
			</div>
		);
	}
}

SearchBar.propTypes = {
	handleSearchTermChange: PropTypes.func.isRequired,
	searchTerm: PropTypes.string
};

SearchBar.defaultProps = {
	searchTerm: ''
};

export default SearchBar;
