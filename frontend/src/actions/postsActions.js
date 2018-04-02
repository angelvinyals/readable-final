import {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,

  SORT_BY_NEW,
  SORT_BY_OLD,
  SORT_BY_HIGHEST_VOTE,
  SORT_BY_LOWEST_VOTE,

  DELETE_POST_BEGIN,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,

} from './actionTypes'

import { getPosts, deletePost } from '../utils/api';


//FETCH POSTS...............................................

export const fetchPosts = () => {
  return dispatch => {
    dispatch(fetchPostsBegin());
    getPosts()
      .then(posts => dispatch(fetchPostsSuccess(posts)))
      .catch(error => dispatch(fetchPostsError(error)));
  }
}

export const fetchPostsBegin = () => ({
  type: FETCH_POSTS_BEGIN,
});

export const fetchPostsSuccess = posts => {
  console.log(posts)
  return{
  type: FETCH_POSTS_SUCCESS,
  posts
  }
};

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

//DELETE POSTS.......................................

export const deletePostToServer = (id) => {
  return dispatch => {
    dispatch(deletePostBegin());
    deletePost(id)
      .then(post => dispatch(deletePostSuccess(post)))
      .catch(error => dispatch(deletePostError(error)));
  }
}

export const deletePostBegin = () => ({
  type: DELETE_POST_BEGIN,
});

export const deletePostSuccess = post => {
  console.log(post.id)
  return{
  type: DELETE_POST_SUCCESS,
  id: post.id
  }
};

export const deletePostError = error => {
  console.log(error)
  return({
    type: DELETE_POST_ERROR,
  })
};;
