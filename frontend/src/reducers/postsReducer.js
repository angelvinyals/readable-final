import {
  FETCH_POSTS_BEGIN,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,

  SORT_BY_NEW,
  SORT_BY_OLD,
  SORT_BY_HIGHEST_VOTE,
  SORT_BY_LOWEST_VOTE,

  DELETE_POST_REQUEST,
  DELETE_POST,
  DELETE_POST_CANCEL,

  DELETE_POST_BEGIN,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,

  VOTE_POST,
  VOTE_POST_BEGIN,
  VOTE_POST_TO_SERVER_SUCCESS,
  VOTE_POST_TO_SERVER_ERROR,

  ADD_POST_BEGIN,
  ADD_POST_TO_SERVER_SUCCESS,
  ADD_POST_TO_SERVER_ERROR,

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
          ...state.postStatus,
          loading:true,
          error:null
        }
      }
    case FETCH_POSTS_SUCCESS:
      return{
        ...state,
        ...posts.reduce((newObj, p) => ({ ...newObj, [p.id]: p }),{}),
        postStatus:{
          ...state.postStatus,
          loading:false,
          error:null
        }
      }
    case FETCH_POSTS_ERROR:
      return{
        ...state,
        postStatus:{
          ...state.postStatus,
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
    case DELETE_POST_BEGIN:
      return{
        ...state,
        postStatus:{
          ...state.postStatus,
          savingDeletePost:true,
          error:null
        }
      }
    case DELETE_POST_SUCCESS:
      return{
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: true
        },
        postStatus:{
          ...state.postStatus,
          savingDeletePost:false,
          error:null
        }
      }
    case DELETE_POST_ERROR:
      return{
        ...state,
        postStatus:{
          ...state.postStatus,
          savingDeletePost:false,
          error:true
        }
      }
    case DELETE_POST_REQUEST:
      return {
        ...state,
        postStatus: {
          ...state.postStatus,
          requestDelete: true,
          idPostToBeDeleted: action.id
        },
      };
      case DELETE_POST_CANCEL:
        return {
          ...state,
          postStatus: {
            ...state.postStatus,
            requestDelete: false,
            idPostToBeDeleted: null
          },
        };
      case DELETE_POST:
        return {
          ...state,
          [action.id]:{
            ...state[action.id],
            deleted:true
          },
          postStatus: {
            ...state.postStatus,
            requestDelete: false,
            idPostToBeDeleted: null
          },
        };
        /*
      case VOTE_POST:
        return {
          ...state,
          [action.id]:{
            ...state[action.id],
            voteScore: action.typeUpDown=== 'upVote'? state[action.id].voteScore+1: state[action.id].voteScore-1
          }
        }
        */
      case VOTE_POST_BEGIN:
        return{
          ...state,
          postStatus:{
            ...state.postStatus,
            savingVote:true,
            error:null
          }
        }

      case VOTE_POST_TO_SERVER_SUCCESS:
        return {
          ...state,
          [action.id]:{
            ...state[action.id],
            voteScore: action.typeUpDow=== 'upVote'? state[action.id].voteScore+1:  state[action.id].voteScore-1,
          },
          postStatus:{
            ...state.postStatus,
            savingVote:false,
            error: null,
          }
        }
      case VOTE_POST_TO_SERVER_ERROR:
        return{
          ...state,
          postStatus:{
            ...state.postStatus,
            savingPost:false,
            error: true
          }
        }
      case ADD_POST_BEGIN:
        return{
          ...state,
          postStatus:{
            ...state.postStatus,
            savingPost:true,
            error:null
          }
        }
      case ADD_POST_TO_SERVER_SUCCESS:
        return {
          ...state,
          [action.post.id]:action.post,
          postStatus:{
            ...state.postStatus,
            savingPost:false,
            error: null
          }
        }
      case ADD_POST_TO_SERVER_ERROR:
        return{
          ...state,
          postStatus:{
            ...state.postStatus,
            savingPost:false,
            error: true
          }
        }



    default:
      return state
  }
}
