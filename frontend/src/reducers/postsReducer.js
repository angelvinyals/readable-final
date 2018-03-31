import {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR
} from '../actions/actionTypes';

const initialState = {
  postStatus: {
    loading: false,
    error: null,
  },
};

export default function postsReducer(state = initialState, action){
  const { posts } = action;

  switch(action.type) {
    case FETCH_POSTS_BEGIN:
      return{
        ...state,
        postStatus:{
          loading:true,
          error:null
        }
      }
    case FETCH_POSTS_SUCCESS:
      return{
        ...state,
        ...posts.reduce((newObj, p) => ({ ...newObj, [p.id]: p }),{}),
        postStatus:{
          loading:false,
          error:null
        }
      }
    case FETCH_POSTS_ERROR:
      return{
        ...state,
        postStatus:{
          loading:false,
          error: true
        }
      }
    default:
      return state
  }
}
