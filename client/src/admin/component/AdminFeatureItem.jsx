import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroupItem } from 'react-bootstrap';

const AdminFeatureItem = props => (
	<ListGroupItem id={props.id}>
		<div className="row">
			<div className="col-xs-6 col-md-8">{props.name}</div>
			<div className="col-xs-6 col-md-4">
				<div className="btn-group pull-right">
					<Link to={`/admin/feature-config/${props.id}`} className="btn btn-primary">
						<span className="glyphicon glyphicon-edit text-large" />
						<span className="hidden-xs text-xlarge">&nbsp;Edit</span>
					</Link>
				</div>
			</div>
		</div>
	</ListGroupItem>
);

AdminFeatureItem.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};

export default AdminFeatureItem;
