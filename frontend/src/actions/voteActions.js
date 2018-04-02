import {
  //VOTE_POST,
  VOTE_POST_BEGIN,
  VOTE_POST_TO_SERVER_SUCCESS,
  VOTE_POST_TO_SERVER_ERROR,

  VOTE_COMMENT_BEGIN,
  VOTE_COMMENT_TO_SERVER_SUCCESS,
  VOTE_COMMENT_TO_SERVER_ERROR,

} from './actionTypes'

import { saveVote } from '../utils/api';

//VOTE POSTS.......................................
/*
export const vote= (id,typeUpDown, typePostComment) => ({
  type: VOTE_POST,
  id,
  typeUpDown,
  typePostComment,
});

*/


export function addVote(id,postOrComment,option) {
  console.log('addVote begins....')
  return function (dispatch){
    dispatch(voteBegin(postOrComment));
    return saveVote({id, postOrComment, option})
      .then(json => {	dispatch(voteToServerSuccess(json)); })
      .catch(error => dispatch(voteToServerError(error)));
  };
}



export const voteBegin = (postOrComment) => {
  switch(postOrComment) {
    case 'post':
      return{ type: VOTE_POST_BEGIN }
    case 'comment':
        return{ type: VOTE_COMMENT_BEGIN }
  }
};

export const voteToServerSuccess = (id,postOrComment,upOrDown) => {
  switch(postOrComment) {
    case 'post':
      return{
        type: VOTE_POST_TO_SERVER_SUCCESS,
        id,
        upOrDown,
      }
    case 'comment':
      return{
        type: VOTE_COMMENT_TO_SERVER_SUCCESS,
        id,
        upOrDown,
      }
  }
};

export const voteToServerError = (id,postOrComment,error) => {
  switch(postOrComment) {
    case 'post':
      return{
        type: VOTE_POST_TO_SERVER_ERROR,
        id,
        error,
      }
    case 'comment':
      return{
        type: VOTE_COMMENT_TO_SERVER_ERROR,
        id,
        error,
      }
  }
};
