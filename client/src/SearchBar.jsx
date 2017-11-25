import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = props => (
	<div className="row">
		<div className="form-group">
			<input
				onChange={props.handleSearchTermChange}
				value={props.searchTerm}
				type="text"
				className="form-control input-lg"
				placeholder="Search here"
			/>
		</div>
	</div>
);

SearchBar.propTypes = {
	handleSearchTermChange: PropTypes.func.isRequired,
	searchTerm: PropTypes.string
};

SearchBar.defaultProps = {
	searchTerm: ''
};

export default SearchBar;
