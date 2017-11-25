import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import SprintItemTableRow from './SprintItemTableRow';

class SprintItemTableView extends Component {
	state = {
		sorted: false,
		sortFunc() {
			return 0;
		}
	};

	handleSortRow = event => {
		const dataSet = event.target.dataset;
		const fieldName = dataSet.field;

		const compare = (a, b) => {
			if (a[fieldName] < b[fieldName]) {
				return -1;
			}
			if (a[fieldName] > b[fieldName]) {
				return 1;
			}

			return 0;
		};

		this.setState(prevState => {
			const sorted = !prevState.sorted;
			const sortFunc = sorted ? (a, b) => compare(b, a) : compare;

			return {
				sorted,
				sortFunc
			};
		});
	};

	render() {
		return (
			<Table responsive bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th className="sorter" data-field="scenarioId" onClick={this.handleSortRow}>
							Scenario Id
							<span className="glyphicon glyphicon-sort text-xxlarge pull-right" />
						</th>
						<th className="sorter" data-field="name" onClick={this.handleSortRow}>
							Scenario Title
							<span className="glyphicon glyphicon-sort text-xxlarge pull-right" />
						</th>
						<th className="sorter" data-field="status" onClick={this.handleSortRow}>
							Scenario Status
							<span className="glyphicon glyphicon-sort text-xxlarge pull-right" />
						</th>
						<th>Details</th>
					</tr>
				</thead>
				<tbody>
					{this.props.sprintItems
						.sort(this.state.sortFunc)
						.map((sprintItem, index) => (
							<SprintItemTableRow
								key={sprintItem.id}
								count={index + 1}
								handleSprintItemStatusSelect={this.props.handleSprintItemStatusSelect}
								editable={this.props.loggedIn}
								{...sprintItem}
							/>
						))}
				</tbody>
			</Table>
		);
	}
}

SprintItemTableView.propTypes = {
	handleSprintItemStatusSelect: PropTypes.func.isRequired,
	loggedIn: PropTypes.bool,
	sprintItems: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			scenarioId: PropTypes.string,
			name: PropTypes.string.isRequired,
			status: PropTypes.string,
			feature: PropTypes.shape({
				name: PropTypes.string.isRequired
			}).isRequired
		})
	).isRequired
};

SprintItemTableView.defaultProps = {
	loggedIn: false
};

export default SprintItemTableView;
