import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Feature from './../../Feature';
import User from './../../User';
import Spinner from './../../Spinner';

const AdminView = props => {
	let featureList;
	let sprintList;
	let userList;
	let addUserBtn;
	let userMgmtPanel;

	if (props.features.length > 0) {
		featureList = props.features.map(feature => (
			<div key={feature.id} className="col-xs-12 col-sm-6 pad-vertical">
				<Feature editMode {...feature} />
			</div>
		));
	} else {
		featureList = <Spinner />;
	}

	if (props.sprints.length > 0) {
		sprintList = props.sprints.map(sprint => {
			const sprintUrl = `/sprint/${sprint.url}`;
			const editSprintUrl = `/admin/sprint-config/${sprint.id}`;

			return (
				<div key={sprint.id} className="col-xs-12 col-sm-6 pad-vertical">
					<div className="panel panel-default" id={sprint.id}>
						<div className="panel-body">
							<h3 className="text-xxlarge">{sprint.name}</h3>
						</div>
						<div className="panel-footer">
							<div className="btn-group btn-group-justified">
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
				</div>
			);
		});
	} else {
		sprintList = <Spinner />;
	}

	if (!props.users) {
		userList = <Spinner />;
	} else if (props.users.length > 0) {
		userList = props.users.map(user => <User key={user.id} {...user} />);
	} else {
		userList = <div className="text-xlarge">No users.</div>;
	}

	if (props.isAdmin) {
		addUserBtn = (
			<Link to="/user-create" className="btn btn-warning">
				<span className="glyphicon glyphicon-plus text-large" />
				&nbsp;<span className="text-xxlarge">
					<span className="hidden-xs">Add a new</span> user
				</span>
			</Link>
		);
		userMgmtPanel = (
			<div className="panel panel-warning">
				<div className="panel-heading">
					<h3 className="panel-title">Users</h3>
				</div>
				<div className="panel-body">
					<div className="list-group">{userList}</div>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="row">
				<div className="panel panel-default">
					<div className="panel-body">
						<div className="btn-toolbar">
							<div className="btn-group">
								<Link to="/admin/feature-create" className="btn btn-success">
									<span className="glyphicon glyphicon-plus text-large" />
									&nbsp;<span className="text-xxlarge">
										<span className="hidden-xs">Add a new</span> link
									</span>
								</Link>
								<Link to="/admin/sprint-create" className="btn btn-info">
									<span className="glyphicon glyphicon-plus text-large" />
									&nbsp;<span className="text-xxlarge">
										<span className="hidden-xs">Add a new</span> sprint
									</span>
								</Link>
								{addUserBtn}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12 col-sm-6">
					<div className="panel panel-success">
						<div className="panel-heading">
							<h3 className="panel-title">Test links</h3>
						</div>
						<div className="panel-body">
							<div className="list-group">{featureList}</div>
						</div>
					</div>
				</div>
				<div className="col-xs-12 col-sm-6">
					<div className="panel panel-info">
						<div className="panel-heading">
							<h3 className="panel-title">Test sprints</h3>
						</div>
						<div className="panel-body">
							<div className="list-group">{sprintList}</div>
						</div>
					</div>
					{userMgmtPanel}
				</div>
			</div>
		</div>
	);
};

AdminView.propTypes = {
	features: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
	sprints: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		})
	).isRequired,
	users: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired
		})
	).isRequired,
	isAdmin: PropTypes.bool
};

AdminView.defaultProps = {
	isAdmin: false
};

export default AdminView;
