import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import NavBarContainer from '../containers/NavBarContainer'
import SortContainer from '../containers/SortContainer'
import RootPageContainer from '../containers/RootPageContainer'


const HomePage = () => (
    <div className="App">
      <Header /> {/*Title*/}
      <NavBarContainer /> {/*Nav Bar Categories*/}
      <SortContainer /> {/*NavBar to sort post by..*/}
      <RootPageContainer /> {/*postlist*/}
    </div>
);

HomePage.propTypes ={
  getCategories: PropTypes.func.isRequired
}

export default HomePage;
