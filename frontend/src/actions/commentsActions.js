import{
  RECEIVE_COMMENTS_SUCCESS,
  RECEIVE_COMMENTS_FAIL,
  FETCH_COMMENTS_BEGIN,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_ERROR,

} from './actionTypes'

import {
  fetchCommentsForSinglePost,



} from '../utils/api';


export const fetchComments = payload => dispatch =>
  fetchCommentsForSinglePost(payload)
    .then(comments => dispatch(fetchCommentsSuccess(comments)))
    .catch(error => dispatch(fetchCommentsError(error)));

export const fetchCommentsSuccess = payload => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload,
});

export const fetchCommentsError = () => ({
  type: FETCH_COMMENTS_ERROR,
});
