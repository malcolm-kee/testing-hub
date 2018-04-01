import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ROUTES } from './constants/routes';

const User = props => {
  const url = ROUTES.UserConfig;
  const targetUrl = url.replace(':id', props.id);
  return (
    <Link to={targetUrl} className="list-group-item">
      <span className="text-xlarge">{props.name}</span>
    </Link>
  );
};

User.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default User;
