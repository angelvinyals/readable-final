import {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,

  SORT_BY_NEW,
  SORT_BY_OLD,
  SORT_BY_HIGHEST_VOTE,
  SORT_BY_LOWEST_VOTE,

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

//SORT BY ACTIONS..................................

export const userRequestSortByNew = () => ({
  type: SORT_BY_NEW,
});

export const userRequestSortByOld = () => ({
  type: SORT_BY_OLD,
});

export const userRequestSortByHighestVote = () => ({
  type: SORT_BY_HIGHEST_VOTE,
});

export const userRequestSortByLowestVote = () => ({
  type: SORT_BY_LOWEST_VOTE,
});
