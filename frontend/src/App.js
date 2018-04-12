import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//import { fetchCategories } from './actions/categoriesActions';
//import { fetchPosts } from './actions/postsActions';

//import PostFormPage        from './components/PostFormPage';
import Header              from './components/Header';
import Categories          from './containers/categories'

import './App.css';

class App extends Component {


  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/*<Route exact path="/addpost" component={PostFormPage} />*/}
          <Route exact path="/:filter?" render={({posts,location, match:{params}}) =>
                <div className="App">
                  renderApp
                  <Header /> {/*Title*/}
                  <Categories
                    url="http://localhost:3001/categories"
                    render={({ categories, isLoading }) => (
                      <div>
                        <h2>Categories</h2>
                        {isLoading && <h2>Loading...</h2>}

                        <ul>
                          {categories.length > 0 && categories.map(cat => (
                            <li key={cat.path}>
                              {cat.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )} 
                  />
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
  //getCategories: () => dispatch(fetchCategories()),
  //getPosts: () => dispatch(fetchPosts()),
});

export default connect(null, mapDispatchToProps)(App);
