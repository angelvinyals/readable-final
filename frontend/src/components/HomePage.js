import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import PostPageContainer from '../containers/PostPageContainer'
import SortContainer from '../containers/SortContainer'

const HomePage = () => (
    <div>
      <Header /> {/*Title*/}
      <SortContainer /> {/*(old/new) (+vOTE/-VOTE)*/}
      <PostPageContainer /> {/*postlist*/}
    </div>
);

HomePage.propTypes ={
  getCategories: PropTypes.func.isRequired
}

export default HomePage;
