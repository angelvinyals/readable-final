import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { fetchCategories } from './actions/categoriesActions';

import HomePage            from './components/HomePage';
import PostFormPage        from './components/PostFormPage';

import CategoriesPageContainer from './containers/CategoriesPageContainer';
import PostPageContainer       from './containers/PostPageContainer';
import './App.css';

class App extends Component {

  componentDidMount = () =>{
    this.props.getCategories();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/addpost" component={PostFormPage} />
          <Switch>
             <Route exact path="/:categoryUrl" component={CategoriesPageContainer} />
             <Route path="/:categoryUrl/:postId/:postSlug" component={PostPageContainer}/>
          </Switch>
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
});

export default connect(null, mapDispatchToProps)(App);
