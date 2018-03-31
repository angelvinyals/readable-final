import { combineReducers } from 'redux'
import categoriesReducer from './categoriesReducer';
import postsReducer from './postsReducer';

export default combineReducers({
  categoriesReducer,
  postsReducer,
})
