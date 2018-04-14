import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import matchSorter from 'match-sorter';
import './Select.css';

const styles = {
  highlighted: {
    backgroundColor: 'grey'
  },
  selected: {
    color: 'yellow'
  }
};

const Item = ({ children, isActive, isSelected, ...restProps }) => (
  <div
    style={{ ...(isActive && styles.highlighted), ...(isSelected && styles.selected) }}
    className="Select--item"
    {...restProps}
  >
    {children}
  </div>
);

Item.propTypes = {
  children: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired
};

export const Select = ({
  items,
  selectedItem: sItem,
  itemToString,
  onChange,
  searchKeys,
  idKey
}) => (
  <Downshift
    items={items}
    selectedItem={sItem}
    itemToString={itemToString}
    onChange={onChange}
    render={({
      isOpen,
      inputValue,
      getInputProps,
      getToggleButtonProps,
      getItemProps,
      highlightedIndex,
      clearSelection,
      selectedItem
    }) => (
      <div>
        <div className="input-group">
          <input
            {...getToggleButtonProps()}
            {...getInputProps({
              type: 'text',
              className: 'form-control',
              placeholder: 'Select an item'
            })}
          />
          <span className="input-group-btn">
            <button
              {...getToggleButtonProps({
                className: 'btn btn-default',
                onClick: selectedItem ? clearSelection : null
              })}
            >
              {selectedItem ? (
                <span className="glyphicon glyphicon-remove text-large" />
              ) : (
                <span className="caret" />
              )}
            </button>
          </span>
        </div>
        {isOpen ? (
          <div>
            {(inputValue
              ? matchSorter(items, inputValue, { keys: searchKeys })
              : items
            ).map((item, index) => (
              <Item
                key={idKey === undefined ? item : item[idKey]}
                {...getItemProps({
                  item,
                  isActive: highlightedIndex === index,
                  isSelected: selectedItem === item
                })}
              >
                {itemToString(item)}
              </Item>
            ))}
          </div>
        ) : null}
      </div>
    )}
  />
);

Select.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedItem: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  itemToString: PropTypes.func,
  searchKeys: PropTypes.arrayOf(PropTypes.string),
  idKey: PropTypes.string
};

Select.defaultProps = {
  selectedItem: undefined,
  itemToString: item => (item === null ? '' : item),
  searchKeys: undefined,
  idKey: undefined
};

export default Select;
