import React, { Component } from 'react';
//import PropTypes from 'prop-types';
//import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//import { fetchCategories } from './actions/categoriesActions';
//import { fetchPosts } from './actions/postsActions';

//import PostFormPage        from './components/PostFormPage';
import Header              from './components/Header';
//import Categories          from './containers/categories'
import HomePage              from './containers/HomePage'

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
                  <HomePage/>
                </div>
              }
            />        
        </Switch>
      </BrowserRouter>
    );
  }
}


export default App;
