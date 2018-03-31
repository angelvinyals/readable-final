import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class PostPageContainer extends Component {
  render() {
    return (
      <Header />
    )
 }
};

PostPageContainer.propTypes = {
  selectedPost: PropTypes.array,

};

const mapStateToProps = (state, ownProps) => ({
  state:state,
});



export default connect(mapStateToProps)(PostPageContainer);
