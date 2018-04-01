import React from 'react';
import PropTypes from 'prop-types';

const SortContainer = () => (
  <div className="margin-top04em">
    <p>sort posts by:</p>
    <div className="listH margin-bottom1em margin-top04em">
      <ul>
        <span>first: </span>
        <button>new </button>
        <button>old </button>
      </ul>
      <ul>
        <span className="padding-left1em">first: </span>
        <button>+voted </button>
        <button>-voted </button>
      </ul>
    <hr/>
    </div>
  </div>


);

export default SortContainer;
