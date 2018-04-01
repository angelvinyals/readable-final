import React from 'react';
import PropTypes from 'prop-types';
import {CategoriesItem} from './CategoriesItem'
import {v4} from 'uuid';

export const CategoriesList = ({categories, handleToggle, handleRemove}) => (

    <div >
      <h5>Filter by categories:</h5>
      <CategoriesItem
        key='all'
        id='all'
        name="All"
        handleToggle={handleToggle}
        handleRemove={handleRemove}
        className="padding-left0"
      />
	    {categories.map(cat =>
	    	<CategoriesItem
	    		key={v4()}
	    		id={cat.name}
	    		{...cat}
	    		handleToggle={handleToggle}
	    		handleRemove={handleRemove}
	    	/>)}
	  </div>

)

CategoriesList.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  categories: PropTypes.array.isRequired,
}
