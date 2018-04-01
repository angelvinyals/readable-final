import React from 'react';
import PropTypes from 'prop-types';
import FilterLink  from './FilterLink'

export const CategoriesItem = ({filter,name}) => (

		<FilterLink filter={name}>{name}</FilterLink>

)

CategoriesItem.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  id:PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
  name: PropTypes.string.isRequired,
}
