import {
  VOTE_POST,
  
} from './actionTypes'

//VOTE POSTS.......................................

export const vote= (id,typeUpDown, typePostComment) => ({
  type: VOTE_POST,
  id,
  typeUpDown,
  typePostComment,
});
