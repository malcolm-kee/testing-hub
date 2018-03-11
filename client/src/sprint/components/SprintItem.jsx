import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  DropdownButton,
  MenuItem,
  OverlayTrigger,
  Popover
} from 'react-bootstrap';
import Markdown from 'react-remarkable';

import { sprintItemStatus, statusStyleMap } from './../../constants/sprint';

const SprintItem = props => {
  const { id, feature, name, scenarioId, status, desc, handleSprintItemStatusSelect } = props;
  const btnStyle = statusStyleMap[status];
  const detailsPopover = feature ? (
    <Popover title="Details" id={`popOver-${id}`}>
      <div>{feature.name}</div>
      <ButtonToolbar>
        <ButtonGroup>
          {feature.links.map(link => (
            <Button key={link.id} href={link.url} target="_blank">
              {link.env}
            </Button>
          ))}
        </ButtonGroup>
      </ButtonToolbar>
      <Markdown source={desc} />
    </Popover>
  ) : null;
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <div className="panel-title">{scenarioId}</div>
      </div>
      <div className="panel-body">
        <h3 className="text-xxlarge">{name}</h3>
      </div>
      <div className="panel-footer">
        <ButtonToolbar>
          <ButtonGroup>
            <DropdownButton
              title={status}
              bsStyle={btnStyle}
              onSelect={handleSprintItemStatusSelect(id)}
              disabled={!props.editable}
              id={`actionBtn-${id}`}
            >
              {sprintItemStatus.map(itemStatus => (
                <MenuItem key={itemStatus} eventKey={itemStatus}>
                  {itemStatus}
                </MenuItem>
              ))}
            </DropdownButton>
            <OverlayTrigger trigger="click" placement="bottom" overlay={detailsPopover}>
              <Button>Details</Button>
            </OverlayTrigger>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    </div>
  );
};

SprintItem.propTypes = {
  id: PropTypes.string.isRequired,
  scenarioId: PropTypes.string,
  name: PropTypes.string.isRequired,
  feature: PropTypes.shape({
    name: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        env: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  status: PropTypes.string,
  desc: PropTypes.string,
  editable: PropTypes.bool.isRequired,
  handleSprintItemStatusSelect: PropTypes.func.isRequired
};

SprintItem.defaultProps = {
  status: 'Not Started',
  scenarioId: 'Scenario',
  desc: ''
};

export default SprintItem;
