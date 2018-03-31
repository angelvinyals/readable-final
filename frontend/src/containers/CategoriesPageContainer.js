import React from 'react';
import Header from '../components/Header';
import NavBarContainer from './NavBarContainer'
import RootPageContainer from './RootPageContainer'
import SortContainer from './SortContainer'

const CategoriesPageContainer = () => (
  <div className="App">
    <Header /> {/*Title*/}
    <NavBarContainer /> {/*Nav Bar Categories*/}
    <SortContainer /> {/*(old/new) (+vOTE/-VOTE)*/}
    <RootPageContainer /> {/*postlist filtered by category*/}
  </div>

);

export default CategoriesPageContainer;
