import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';

import { selectors, selectSprints } from '../../reducers';
import { updateSprintItemStatus } from './../../actions/sprint';

import SprintSummary from './SprintSummary';
import Header from './../../Header';
import { Spinner } from './../../Spinner';
import DotsLoader from './../../DotsLoader';
import SprintItemCardView from './SprintItemCardView';
import SprintItemTableView from './SprintItemTableView';

import sprintService from './../../service/sprintService';

class SprintContainerView extends Component {
  state = {
    error: ''
  };

  handleSprintItemStatusSelect = itemId => eventKey => {
    event.preventDefault();

    const { thisSprint, invokeUpdateSprintItemStatus } = this.props;

    const status = eventKey;
    const sprintId = thisSprint.id;

    sprintService
      .updateItemStatus({ id: sprintId, itemId, status })
      .then(() => {
        invokeUpdateSprintItemStatus({ itemId, status });
      })
      .catch(() => {
        this.setState({
          error: 'Sorry, we have problem updating status.'
        });
      });
  };

  render() {
    const { sprints, thisSprint } = this.props;
    let content;
    let header;
    let progressBar;

    if (this.state.error) {
      header = (
        <header className="page-header">
          <h1>Error</h1>
        </header>
      );
      content = (
        <div className="alert alert-danger">
          <p className="text-xlarge">{this.state.error}</p>
        </div>
      );
    } else if (sprints && sprints.length > 0) {
      const sprintItems = thisSprint.sprintItems;

      header = (
        <header className="page-header">
          <h1>{thisSprint.name}</h1>
          <p>{thisSprint.desc}</p>
        </header>
      );

      progressBar = <SprintSummary sprintItems={thisSprint.sprintItems} />;

      content = (
        <Tabs defaultActiveKey={1} bsStyle="pills">
          <Tab eventKey={1} title="Card View">
            <SprintItemCardView
              sprintItems={sprintItems}
              loggedIn={this.props.loggedIn}
              handleSprintItemStatusSelect={this.handleSprintItemStatusSelect}
            />
          </Tab>
          <Tab eventKey={2} title="Table View">
            <SprintItemTableView
              sprintItems={sprintItems}
              loggedIn={this.props.loggedIn}
              handleSprintItemStatusSelect={this.handleSprintItemStatusSelect}
            />
          </Tab>
        </Tabs>
      );
    } else {
      header = (
        <header className="page-header">
          <h1>Loading Sprint...</h1>
          <p>
            <DotsLoader />
          </p>
        </header>
      );
      content = <Spinner />;
    }

    return (
      <div>
        <Header showLogin />
        <div className="container-fluid">
          <div className="row">
            {header}
            <div className="container">
              {progressBar}
              <div className="row">
                <div className="col-sm-12 col-xs-12">{content}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const sprints = selectSprints(state);
  const thisSprint = sprints.find(sprint => sprint.url === ownProps.url);

  return {
    sprints,
    thisSprint,
    loggedIn: selectors.getLoginState(state)
  };
};

const mapDispatchToProps = dispatch => ({
  invokeUpdateSprintItemStatus({ itemId, status }) {
    dispatch(updateSprintItemStatus({ itemId, status }));
  }
});

SprintContainerView.propTypes = {
  thisSprint: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sprintItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        scenarioId: PropTypes.string,
        name: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  sprints: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sprintItems: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          scenarioId: PropTypes.string,
          name: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  invokeUpdateSprintItemStatus: PropTypes.func.isRequired
};

export const SprintContainer = connect(mapStateToProps, mapDispatchToProps)(SprintContainerView);

export default SprintContainer;
