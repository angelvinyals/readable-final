import {
  FETCH_CATEGORIES_BEGIN,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR
} from '../actions/actionTypes'

const initialState = {
    status: {
      loading: false,
      error: null
    },
};

export default function categoriesReducer(state = initialState, action) {
  const {categories} = action

  switch(action.type) {
    case FETCH_CATEGORIES_BEGIN:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
        },
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...categories.reduce((newObj, cat) => ({ ...newObj, [cat.name]: cat }),{}),
        status: {
          ...state.status,
          loading: false,
        },
      };

    case FETCH_CATEGORIES_ERROR:
      return {
        status: {
          loading: false,
          error: true,
        },
      };
    default:
      return state;
    }
  }
