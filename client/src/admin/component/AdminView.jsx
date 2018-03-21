import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

import AdminSprintItem from './AdminSprintItem';
import AdminFeatureItem from './AdminFeatureItem';
import User from './../../User';
import Spinner from './../../Spinner';

const AdminView = props => {
  let featureList;
  let sprintList;
  let userList;
  let addUserBtn;
  let userMgmtPanel;

  if (props.features) {
    if (props.features.length > 0) {
      featureList = props.features.map(feature => (
        <AdminFeatureItem key={feature.id} {...feature} />
      ));
    } else {
      featureList = <div className="text-xlarge">{localize('no available feature')}</div>;
    }
  } else {
    featureList = <Spinner />;
  }

  if (props.sprints) {
    if (props.sprints.length > 0) {
      sprintList = (
        <ListGroup>
          {props.sprints.map(sprint => <AdminSprintItem key={sprint.id} {...sprint} />)}
        </ListGroup>
      );
    } else {
      sprintList = <div className="text-xlarge">{localize('no available sprint')}</div>;
    }
  } else {
    sprintList = <Spinner />;
  }

  if (props.users) {
    if (props.users.length > 0) {
      userList = props.users.map(user => <User key={user.id} {...user} />);
    } else {
      userList = <div className="text-xlarge">No users.</div>;
    }
  } else {
    userList = <Spinner />;
  }

  if (props.isAdmin) {
    addUserBtn = (
      <Link to="/user-create" className="btn btn-warning">
        <span className="glyphicon glyphicon-plus text-large" />
        &nbsp;<span>
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
                  &nbsp;<span>
                    <span className="hidden-xs">Add a new</span> link
                  </span>
                </Link>
                <Link to="/admin/sprint-create" className="btn btn-info">
                  <span className="glyphicon glyphicon-plus text-large" />
                  &nbsp;<span>
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
  features: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })),
  sprints: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  isAdmin: PropTypes.bool
};

AdminView.defaultProps = {
  isAdmin: false,
  features: null,
  sprints: null
};

export default AdminView;
