import React from 'react';
import Header from '../components/Header';
import PostPageContainer from './PostPageContainer'
import SortContainer from './SortContainer'

const CategoriesPageContainer = () => (
  <div>
    <Header /> {/*Title*/}
    <SortContainer /> {/*(old/new) (+vOTE/-VOTE)*/}
    <PostPageContainer /> {/*postlist filtered by category*/}
  </div>

);

export default CategoriesPageContainer;
