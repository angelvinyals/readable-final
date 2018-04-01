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
//import selectItemForDeletion from '../../selectors/selectors';

class PostView extends Component {

  render() {
    const {
      loading,
      error,
      post,
      homeFlag,
      userVotePost,
      RequestDeletePost,
      requestDeletePostStatus,
      idToMarkAsDeleted,
      confirmedDeletePostRequest,
      cancelDeletePostRequest,
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
      <div>
        <button onClick={() => userVotePost(post.id, 'upVote', 'posts')}>+ </button>
        {post.voteScore}
        <button onClick={() => userVotePost(post.id, 'downVote', 'posts')}> - </button>
        <Link to={`/${post.category}/${post.id}`}>
          {post.title}
        </Link>
      </div>
      <div>
        Submitted {distanceInWordsToNow(post.timestamp)} ago by{' '}
        {post.author} to{' '}
        <Link to={`/${post.category}`}>
          {`r/${post.category}`}
        </Link>
      </div>
      {!homeFlag && post.body}
      <div>
        <Link to={`/${post.category}/${post.id}`}>
          {post.commentCount} comments
        </Link>
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
        {commentsFlag && (
          <Fragment>

            <div>Comments:</div>
          </Fragment>
        )}
          <hr />
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
  cancelDeletePostRequest: () => {dispatch(deletePostCancel())}
});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
