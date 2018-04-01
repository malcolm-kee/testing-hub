import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setLoginStatus } from '../../actions/auth';
import { setFeatures, loadFeatureError } from '../../actions/feature';
import { setSprints } from '../../actions/sprint';
import { getAll as featureGetAll } from '../../service/featureService';
import { getAll as sprintGetAll } from '../../service/sprintService';
import { getLoginStatus, getCurrentUser } from '../../service/authenticationService';

class InitializeServiceContainer extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    initializeOnMount: PropTypes.bool,
    dispatchUpdateLoginStatus: PropTypes.func.isRequired,
    dispatchSetFeatures: PropTypes.func.isRequired,
    dispatchSetSprints: PropTypes.func.isRequired,
    dispatchLoadFeatureError: PropTypes.func.isRequired
  };

  static defaultProps = {
    initializeOnMount: false
  };

  state = {
    isLoading: true,
    error: ''
  };

  componentDidMount() {
    const { initializeOnMount } = this.props;
    if (initializeOnMount) {
      this.initializeLoginStatus().then(loggedIn => {
        if (loggedIn) {
          this.initializeData();
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    }
  }

  initializeData = () =>
    new Promise((resolve, reject) => {
      const { dispatchSetFeatures, dispatchLoadFeatureError, dispatchSetSprints } = this.props;
      this.setState({
        isLoading: true
      });
      Promise.all([featureGetAll(), sprintGetAll()])
        .then(([features, sprints]) => {
          dispatchSetFeatures(features);
          dispatchSetSprints(sprints);
          this.setState({
            isLoading: false
          });
          resolve();
        })
        .catch(err => {
          dispatchLoadFeatureError(err);
          this.setState({
            isLoading: false
          });
          reject(err);
        });
    });

  initializeLoginStatus = () =>
    new Promise(resolve => {
      Promise.all([getLoginStatus(), getCurrentUser()])
        .then(data => {
          const loggedIn = data[0];
          const currentUser = data[1];
          this.props.dispatchUpdateLoginStatus({
            loggedIn,
            userName: currentUser.name,
            isAdmin: currentUser.isAdmin
          });
          resolve(true);
        })
        .catch(() => {
          this.props.dispatchUpdateLoginStatus({ loggedIn: false });
          resolve(false);
        });
    });

  render() {
    const { render } = this.props;
    const { isLoading } = this.state;
    return render({ isLoading, triggerService: this.initializeData });
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchUpdateLoginStatus({ loggedIn, userName, isAdmin }) {
    dispatch(setLoginStatus({ loggedIn, userName, isAdmin }));
  },
  dispatchSetFeatures(features) {
    dispatch(setFeatures({ features }));
  },
  dispatchLoadFeatureError(error) {
    dispatch(loadFeatureError(error));
  },
  dispatchSetSprints(sprints) {
    dispatch(setSprints({ sprints }));
  }
});

export const InitializeService = connect(null, mapDispatchToProps)(InitializeServiceContainer);

export default InitializeService;
