import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  userRequestSortByHighestVote,
  userRequestSortByLowestVote,
  userRequestSortByNew,
  userRequestSortByOld,
} from '../actions/postsActions';

const SortContainer = ({
  highlightTabNewest,
  highlightTabOldest,
  highlightTabHighest,
  highlightTabLowest,
  sortByHighestVotes,
  sortByLowestVotes,
  sortByNewest,
  sortByOldest,
}) => {

  return(
  <div className="margin-top04em margin-bottom0">
    <h5>Sort posts:</h5>
    <div className="listH margin-bottom0">
      <ul>
        <span>first: </span>
        <button className={highlightTabNewest? 'active' : 'no_active'} onClick={() => sortByNewest()}> new </button>
        <button className={highlightTabOldest? 'active' : 'no_active'} onClick={() => sortByOldest()}> old </button>
      </ul>
      <ul>
        <span className="padding-left1em"> </span>
        <button className={highlightTabHighest? 'active' : 'no_active'} onClick={() => sortByHighestVotes()}>Highest </button>
        <button className={highlightTabLowest?  'active' : 'no_active'} onClick={() => sortByLowestVotes() }> Lowest </button>
      </ul>
    </div>
    <hr className="margin-bottom04em margin-top04em hr-double"/>
  </div>
);
}

SortContainer.propTypes = {
  highlightTabNewest: PropTypes.bool.isRequired,
  highlightTabOldest: PropTypes.bool.isRequired,
  highlightTabHighest: PropTypes.bool.isRequired,
  highlightTabLowest: PropTypes.bool.isRequired,
  sortByHighestVotes: PropTypes.func.isRequired,
  sortByLowestVotes: PropTypes.func.isRequired,
  sortByNewest: PropTypes.func.isRequired,
  sortByOldest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  highlightTabNewest: state.postsReducer.sortPosts.newest,
  highlightTabOldest: state.postsReducer.sortPosts.oldest,
  highlightTabLowest: state.postsReducer.sortPosts.lowest,
  highlightTabHighest: state.postsReducer.sortPosts.highest,
});

const mapDispatchToProps = dispatch => ({
  sortByNewest: () => {dispatch(userRequestSortByNew());},
  sortByOldest: () => {dispatch(userRequestSortByOld());},
  sortByHighestVotes: () => {dispatch(userRequestSortByHighestVote());},
  sortByLowestVotes: () => {dispatch(userRequestSortByLowestVote());},
});

export default connect(mapStateToProps, mapDispatchToProps)(SortContainer);
