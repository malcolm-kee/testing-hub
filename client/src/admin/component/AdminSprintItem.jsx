import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroupItem } from 'react-bootstrap';

const AdminSprintItem = props => {
	const sprintUrl = `/sprint/${props.url}`;
	const editSprintUrl = `/admin/sprint-config/${props.id}`;

	return (
		<ListGroupItem id={props.id}>
			<div className="row">
				<div className="col-xs-6 col-sm-4 col-md-6">{props.name}</div>
				<div className="col-xs-6 col-sm-8 col-md-6">
					<div className="btn-group pull-right">
						<Link to={editSprintUrl} className="btn btn-primary">
							<span className="glyphicon glyphicon-edit text-large" />
							<span className="hidden-xs text-xlarge">&nbsp;Edit</span>
						</Link>
						<Link to={sprintUrl} target="_blank" className="btn btn-primary">
							<span className="glyphicon glyphicon-new-window text-large" />
							<span className="hidden-xs text-xlarge">&nbsp;View</span>
						</Link>
					</div>
				</div>
			</div>
		</ListGroupItem>
	);
};

AdminSprintItem.propTypes = {
	id: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};

export default AdminSprintItem;
