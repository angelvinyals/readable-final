import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  getCategories,
  getCategoriesFetchError,
  getCategoriesisLoading,
} from '../selectors/categoriesSelectors';

const NavBarContainer = ({ categories, categoryError, categoryLoading }) => {
  if (categoryLoading) {
    return (
      <div>....loading</div>
    )
  }

  if (categoryError) {
      return (
      <NavLink to="/" activeClassName="active" exact>
        All
      </NavLink>
      );
  }
  return (
    <div className="space_evently" >
      <NavLink  exact to="/" activeClassName="active"  key={'all'}>
        All
      </NavLink>
      {categories.map(category => (
            <NavLink to={`/${category.path}`} activeClassName="active"  key={category.id}>
              {category.name}
            </NavLink>
      ))}
    </div>
  );
};

NavBarContainer.propTypes = {
  categories: PropTypes.array.isRequired,
  categoryLoading: PropTypes.bool.isRequired,
  categoryError: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  categories: getCategories(state),
  categoryError: getCategoriesFetchError(state),
  categoryLoading: getCategoriesisLoading(state),
});

export default connect(mapStateToProps)(NavBarContainer);
