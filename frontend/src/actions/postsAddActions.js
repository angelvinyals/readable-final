import 'cross-fetch/polyfill'
import uuid from 'uuid';


import {ADD_POST_BEGIN,
  ADD_POST_TO_SERVER_SUCCESS,
  ADD_POST_TO_SERVER_ERROR
} from './actionTypes'

import { savePost } from '../utils/api';


export function addPost(newPost) {
  console.log('addPost begins....')
  const post = {
    id: uuid.v4(),
    timestamp: Date.now(),
    ...newPost,
  };
  return dispatch => {
    dispatch(addPostBegin());
    savePost(post)
      .then(json => {dispatch(addPostToServerSuccess(json))})
      .catch(error => dispatch(addPostToServerError(error)));
  };
}





export const addPostBegin = () => ({
  type: ADD_POST_BEGIN
});

export const addPostToServerSuccess = post => ({
  type: ADD_POST_TO_SERVER_SUCCESS,
  post,
});

export const addPostToServerError = error => ({
  type: ADD_POST_TO_SERVER_ERROR,
  error,
});
