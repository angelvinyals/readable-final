import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { fetchCategories } from './actions/categoriesActions';
import { fetchPosts } from './actions/postsActions';

//import PostFormPage        from './components/PostFormPage';
import Header              from './components/Header';

import PostAddContainer         from './containers/PostAddContainer';
import SortContainer            from './containers/SortContainer'
import PostsListContainer       from './containers/PostsListContainer'
import PostPageContainer        from './containers/PostPageContainer'
import CategoriesContainer      from './containers/categories/CategoriesContainer'

import './App.css';

class App extends Component {

  componentDidMount = () =>{
    this.props.getCategories();
    this.props.getPosts();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/*<Route exact path="/addpost" component={PostFormPage} />*/}
          <Route exact path="/addpost" render={({history}) =>
              <div className="App">
                renderApp- addpost
                <Header /> {/*Title*/}
                <PostAddContainer history={history} /> {/*form to add post*/}
              </div>
            }
          />
        <Route exact path="/:filter?" render={({posts,location, match:{params}}) =>
              <div className="App">
                renderApp
                <Header /> {/*Title*/}
                <CategoriesContainer location={location}  /> {/*Nav Bar Categories*/}
                <SortContainer /> {/*NavBar to sort post by..*/}
                <PostsListContainer  filter={params.filter}/> {/*postlist*/}
              </div>
            }
          />

        <Route exact path="/:categoryUrl/:postId" render={({match:{params},history}) =>
            <div className="App">
              renderApp- View ALL POST
              <Header /> {/*Title*/}
              <PostPageContainer history={history} params={params}/> {/*form to add post*/}
            </div>
          }
        />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes ={
  getCategories: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(fetchCategories()),
  getPosts: () => dispatch(fetchPosts()),
});

export default connect(null, mapDispatchToProps)(App);
