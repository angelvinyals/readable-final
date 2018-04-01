import {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,

  SORT_BY_NEW,
  SORT_BY_OLD,
  SORT_BY_HIGHEST_VOTE,
  SORT_BY_LOWEST_VOTE,

} from '../actions/actionTypes';

const initialState = {
  postStatus: {
    loading: false,
    error: null,
  },
  sortPosts: {
    sortBy: 'NEW',
    newest: true,
    oldest: false,
    highest: false,
    lowest: false,
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
    case SORT_BY_NEW:
      return {
        ...state,
        sortPosts: {
          sortBy: 'NEW',
          newest: true,
          oldest: false,
          highest: false,
          lowest: false,
        },
      };
    case SORT_BY_OLD:
      return {
        ...state,
        sortPosts: {
          sortBy: 'OLD',
          newest: false,
          oldest: true,
          highest: false,
          lowest: false,
        },
      };
    case SORT_BY_HIGHEST_VOTE:
      return {
        ...state,
        sortPosts: {
          sortBy: 'HIGHEST_VOTE',
          newest: false,
          oldest: false,
          highest: true,
          lowest: false,
        },
      };
    case SORT_BY_LOWEST_VOTE:
      return {
        ...state,
        sortPosts: {
          sortBy: 'LOWEST_VOTE',
          newest: false,
          oldest: false,
          highest: false,
          lowest: true,
        },
      };
    default:
      return state
  }
}
