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
    const {posts,isPostsLoading,errorLoadingPosts}= this.props
    return (
      <div>
        {isPostsLoading === true && <div>loading....</div> }
        {errorLoadingPosts !== null && <span className="error">Ohh... threre is an error loading posts</span>}
        {posts===[] && <div>there is no POSTS yet</div>}
        {errorLoadingPosts === null &&
          <ul>
            <h5 className= "margin-top04em margin-bottom1em">POST LIST</h5>

            {posts.map((p) => <PostView post={p} key={p.id} homeFlag />)}
          </ul>
        }
      </div>

    );
  }
}

RootPageContainer.propTypes = {
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = ({postsReducer}, {filter}) => {
  console.log(filter)
  return ({
  errorLoadingPosts: postsReducer.postStatus.error,
  isPostsLoading: postsReducer.postStatus.loading,
  posts: getFilteredPosts(postsReducer,filter,),
})};

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(fetchPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootPageContainer);
