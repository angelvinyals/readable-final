import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

const FilterLink = ({filter, children}) => (
	<NavLink
    exact to={filter==='All'? '/' : `/${filter}`}
    activeStyle={{
      color: 'red',
      textAlign: 'center',
    }}
  >
    {children}
  </NavLink>
)

export default (FilterLink)

FilterLink.propTypes = {
  filter:PropTypes.string.isRequired,
  children:PropTypes.string.isRequired,
}
