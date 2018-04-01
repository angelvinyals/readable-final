import React, {Component}from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import {CategoriesList} from './CategoriesList'
import {
  getCategories,
  getCategoriesFetchError,
  getCategoriesisLoading,
} from '../../selectors/categoriesSelectors';

class CategoriesContainer extends Component {

	render() {
		const {categories,loading,error} = this.props;
		return (
			<div >
				{loading===true && <div>loading....</div> }
				{error!== null && <span className="error">{error}</span>}
        {categories===[] && <div>there is no CATEGORIES yet</div>}
				{categories !== undefined &&
          <div>
            <CategoriesList	categories={categories} />
            <hr className="margin-bottom04em margin-top04em"/>
          </div>

        }

	    </div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
		categories: getCategories(state),
		loading: getCategoriesisLoading(state),
		error: getCategoriesFetchError(state),
	}
};

export default connect(mapStateToProps)(CategoriesContainer);

CategoriesContainer.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  categories: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.bool
}
