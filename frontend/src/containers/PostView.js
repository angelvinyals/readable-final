import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

//import CommentForm from './CommentForm';

class PostView extends Component {

  render() {
    const {
      loading,
      error,
      post,
      homeFlag,
      userVotePost,
      requestDeletePostStatus,
      confirmedDeletePostRequest,
      userCancelDeleteRequest,
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
        {!requestDeletePostStatus && (
          <button>
            delete
          </button>  )}
        {requestDeletePostStatus && (
          <Fragment>
            <div>are you sure?</div>
            <div onClick={() => confirmedDeletePostRequest(post.id)}>
              yes
            </div>
            <div>/</div>
            <div onClick={() => userCancelDeleteRequest()}>
              no
            </div>
          </Fragment>
        )}
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
  homeFlag: PropTypes.bool,
  userVotePost: PropTypes.func,
  requestDeletePostStatus: PropTypes.bool,
  confirmedDeletePostRequest: PropTypes.func,
  userCancelDeleteRequest: PropTypes.func,
  commentsFlag: PropTypes.bool,
};

PostView.defaultProps = {
  homeFlag: false,
  postPage: false,
  commentsFlag: false,
};

const mapStateToProps = (state, {posts, homeFlag}) => ({
  state:state
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PostView);
