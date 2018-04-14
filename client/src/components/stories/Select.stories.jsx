import React from 'react';

import { storiesOf } from '@storybook/react';

import { Select } from '../Select';

storiesOf('Select', module).add('simple', () => {
  const items = ['Malcolm', 'Tiara', 'Emil', 'Yusuf'];
  return <Select items={items} />;
});

const items = [
  {
    id: 1,
    name: 'Malcolm'
  },
  {
    id: 2,
    name: 'Tiara'
  },
  {
    id: 3,
    name: 'Emil'
  },
  {
    id: 4,
    name: 'Yusuf'
  }
];
const itemToString = item => (item === null ? '' : item.name);
const searchKeys = ['name'];
class SelectDemo extends React.Component {
  state = {
    selectedItem: undefined
  };

  handleChange = item => {
    this.setState({
      selectedItem: item
    });
  };
  render() {
    return (
      <Select
        items={items}
        selectedItem={this.state.selectedItem}
        onChange={this.handleChange}
        itemToString={itemToString}
        searchKeys={searchKeys}
        idKey="id"
      />
    );
  }
}

storiesOf('Select', module).add('controlled', () => <SelectDemo />);
