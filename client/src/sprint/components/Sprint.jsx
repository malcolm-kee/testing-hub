import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from './../../Header';
import Spinner from './../../Spinner';

import { selectFeatureCount, selectSprintCount } from '../../reducers';
import { updateSprint } from './../../actions/sprint';

import { SprintContainer } from './SprintContainer';

const Sprint = ({ featureCount, sprintCount, ...restProps }) => {
  if (featureCount > 0 && sprintCount > 0) {
    return <SprintContainer {...restProps} />;
  }
  return (
    <div>
      <Header />
      <Spinner />
    </div>
  );
};

const mapStateToProps = state => ({
  featureCount: selectFeatureCount(state),
  sprintCount: selectSprintCount(state)
});

const mapDispatchToProps = dispatch => ({
  invokeUpdateSprint({ sprint }) {
    dispatch(updateSprint({ sprint }));
  }
});

Sprint.propTypes = {
  featureCount: PropTypes.number.isRequired,
  sprintCount: PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Sprint);
