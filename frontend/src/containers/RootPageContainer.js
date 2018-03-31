import React, {Component} from 'react';
import PropTypes from 'prop-types';

class RootPageContainer extends Component {

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


export default RootPageContainer;
