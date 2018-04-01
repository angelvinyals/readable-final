import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import {
  deletePostRequest,
  deletePost,
  deletePostCancel,
} from '../actions/postsActions';
import {
  vote,
} from '../actions/voteActions';
//import selectItemForDeletion from '../../selectors/selectors';

class PostView extends Component {

  render() {
    const {
      loading,
      error,
      post,
      homeFlag,
      RequestDeletePost,
      requestDeletePostStatus,
      idToMarkAsDeleted,
      confirmedDeletePostRequest,
      cancelDeletePostRequest,
      votePostRequest,
      commentsFlag,
    } = this.props;

    if (loading) {
      return <div>...is loading</div>;
    }

    if (error) {
      return <div>...error</div>;
    }

    return (
    <div>
      <div className="margin-bottom04em">
        <Link to={`/${post.category}/${post.id}`}>
          <label className="font-size2em font-bold margin-bottom1em padding-left-10px"> {post.title}</label>
        </Link>
      </div>
      <div className="margin-bottom04em">
        <button onClick={() => votePostRequest(post.id, 'upVote')}>+ </button>
        <label className="font-size1em font-bold"> {post.voteScore} </label>
        <button onClick={() => votePostRequest(post.id, 'downVote')}> - </button>
        <label className="font-size07em padding-left1em">
          Submitted {distanceInWordsToNow(post.timestamp)} ago by{' '}{post.author} to{' '}
          <Link to={`/${post.category}`}>
            {`r/${post.category}`}
          </Link>
        </label>
        <Link to="/newpost">
          <button>
            edit
          </button>
        </Link>
        <button onClick={() => RequestDeletePost(post.id)}>
            delete
        </button>
        {requestDeletePostStatus && post.id===idToMarkAsDeleted &&
          <div>
            <h5>Are you sure?</h5>
            <button onClick={() => confirmedDeletePostRequest(post.id)}>Yes</button>
            <button onClick={() => cancelDeletePostRequest(post.id)}>No</button>
          </div>
        }
        {!homeFlag && post.body}
      </div>
      {!homeFlag && post.body}
      <div>

        <hr className=" margin-bottom04em margin-top04em hr-dashed"/>
        <Link to={`/${post.category}/${post.id}`}>
          {post.commentCount} comments
        </Link>
        {commentsFlag && (
          <Fragment>

            <div>Comments:</div>
          </Fragment>
        )}
          <hr className="margin-bottom04em margin-top04em hr-dashed-bold"/>
      </div>

    </div>
  );
  }
}

PostView.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  post: PropTypes.object.isRequired,
  requestDeletePostStatus: PropTypes.bool,
  idToMarkAsDeleted:PropTypes.string,
  homeFlag: PropTypes.bool,
  userVotePost: PropTypes.func,
  userRequestDeletePost: PropTypes.func.isRequired,
  confirmedDeletePostRequest: PropTypes.func,
  userCancelDeleteRequest: PropTypes.func,
  commentsFlag: PropTypes.bool,
};

PostView.defaultProps = {
  homeFlag: false,
  postPage: false,
  commentsFlag: false,
  requestDeletePostStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, {posts, homeFlag}) => ({
  error: state.postsReducer.postStatus.error,
  loading: state.postsReducer.postStatus.loading,
  requestDeletePostStatus: state.postsReducer.postStatus.requestDelete,
  idToMarkAsDeleted:state.postsReducer.postStatus.idPostToBeDeleted,

});

const mapDispatchToProps = dispatch => ({
  RequestDeletePost: (id) => {dispatch(deletePostRequest(id));},
  confirmedDeletePostRequest: (id) => {dispatch(deletePost(id))},
  cancelDeletePostRequest: () => {dispatch(deletePostCancel())},
  votePostRequest:(id,typeUpDown) =>{dispatch(vote(id,typeUpDown,'post'))},
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
