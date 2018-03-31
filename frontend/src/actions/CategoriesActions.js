import {
  FETCH_CATEGORIES_BEGIN,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR,
} from './actionTypes'

import { getCategories } from '../utils/api';

export const fetchCategories = () => {
  return dispatch => {
    dispatch(fetchCategoriesBegin());
    return getCategories()
      .then(categories => dispatch(fetchCategoriesSuccess(categories)))
      .catch(error => dispatch(fetchCategoriesError(error)));
  }
}

export const fetchCategoriesBegin = () => ({
  type: FETCH_CATEGORIES_BEGIN,
});

export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  categories
});

export const fetchCategoriesError = error => ({
  type: FETCH_CATEGORIES_ERROR,
  status: {
    error
  }
});
