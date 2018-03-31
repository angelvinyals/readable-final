import React from 'react';
import PropTypes from 'prop-types';


const Header = () => (
  <div className="containerFlex">
    <div className = "row one_row H_100 H_center V_center">
      <h4 className="textCenter">READABLE</h4>
    </div>
  </div>
);

Header.PropTypes={
  Header: PropTypes.func.isRequired
}

export default Header;
