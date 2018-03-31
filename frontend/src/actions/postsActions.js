import {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
} from './actionTypes'

import { getPosts } from '../utils/api';

export const fetchPosts = () => {
  return dispatch => {
    dispatch(fetchPostsBegin());
    return getPosts()
      .then(posts => dispatch(fetchPostsSuccess(posts)))
      .catch(error => dispatch(fetchPostsError(error)));
  }
}

export const fetchPostsBegin = () => ({
  type: FETCH_POSTS_BEGIN,
});

export const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  posts
});

export const fetchPostsError = error => {
  console.log(error)
  return({
    type: FETCH_POSTS_ERROR,
    postStatus: {
      error
    }
  })
};
