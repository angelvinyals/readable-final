import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postsActions';
class RootPageContainer extends Component {

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <ul>
        <li>post 1</li>
        <li>post 2</li>
        <li>post 3</li>
      </ul>
    );
  }
}

RootPageContainer.propTypes = {
  posts: PropTypes.array.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(fetchPosts()),
});

export default connect(null, mapDispatchToProps)(RootPageContainer);
