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

const SprintItemTableRow = props => {
  const { feature, status, id, handleSprintItemStatusSelect } = props;
  const btnStyle = statusStyleMap[props.status];
  const detailsPopover = feature ? (
    <Popover title="Details" id={`rowPopOver-${props.id}`}>
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
      <Markdown source={props.desc} />
    </Popover>
  ) : null;

  return (
    <tr>
      <td>{props.count}</td>
      <td>{props.scenarioId}</td>
      <td>{props.name}</td>
      <td>
        <DropdownButton
          title={status}
          bsStyle={btnStyle}
          onSelect={handleSprintItemStatusSelect(id)}
          disabled={!props.editable}
          id={`rowActionBtn-${id}`}
        >
          {sprintItemStatus.map(statusOption => (
            <MenuItem key={statusOption} eventKey={statusOption}>
              {statusOption}
            </MenuItem>
          ))}
        </DropdownButton>
      </td>
      <td>
        <OverlayTrigger trigger="click" placement="bottom" overlay={detailsPopover}>
          <Button>Details</Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
};

SprintItemTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  scenarioId: PropTypes.string,
  name: PropTypes.string.isRequired,
  status: PropTypes.string,
  desc: PropTypes.string,
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
  editable: PropTypes.bool.isRequired,
  handleSprintItemStatusSelect: PropTypes.func.isRequired
};

SprintItemTableRow.defaultProps = {
  scenarioId: 'No scenario id',
  desc: '',
  status: 'Not Started'
};

export default SprintItemTableRow;
