import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostView from './PostView';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import '../App.css'

class PostPageContainer extends Component {

  render() {
    console.log(post)
    const {post}= this.props
    return (
      <div>
          {typeof(post)==='undefined' && <div>loading...</div>}
          {typeof(post)!=='undefined' &&
          <div>
            <h5 className= "margin-top04em margin-bottom1em">POST DETAIL </h5>
            <label className="font-size2em font-bold margin-bottom1em padding-left-10px"> {post.title}</label>
            <div className="margin-bottom1em">{post.body}</div>
            <div className="margin-bottom04em">
                <label className="font-size1em font-bold">votes: {post.voteScore} </label>
            </div>
            <div>
              <label className="font-size07em  padding-rigth1em">
                Submitted {distanceInWordsToNow(post.timestamp)} ago by{' '}{post.author} to{' '}
                <Link to={`/${post.category}`}>
                  {`${post.category}`}
                </Link>
              </label>
            </div>
            <div>
                comments:  {post.commentCount}
            </div>
            <hr/>
            <h5 className= "margin-top04em margin-bottom1em">COMMENTS DETAIL </h5>
          </div>
        }
      </div>
    )
  }
}

PostPageContainer.propTypes = {
  post: PropTypes.object.isRequired,
};

const mapStateToProps = ({postsReducer}, {params}) => {
  console.log(params)
  return ({
  post: postsReducer[params.postId]
})};

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPageContainer);
