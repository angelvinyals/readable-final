import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postsActions';
import { getFilteredPosts} from '../selectors/postsSelectors';
import PostView from './PostView';

class RootPageContainer extends Component {

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const {posts}= this.props
    console.log(posts)
    return (
      <ul>
          {posts.map((p) => <PostView post={p} key={p.id} homeFlag />)}
      </ul>
    );
  }
}

RootPageContainer.propTypes = {
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = ({postsReducer}) => ({
  loadingPostsError: postsReducer.postStatus.error,
  isPostsLoading: postsReducer.postStatus.loading,
  posts: getFilteredPosts(postsReducer),
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(fetchPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootPageContainer);
