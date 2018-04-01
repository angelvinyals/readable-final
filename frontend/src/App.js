import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { fetchCategories } from './actions/categoriesActions';

import PostFormPage        from './components/PostFormPage';
import Header              from './components/Header';

import PostPageContainer       from './containers/PostPageContainer';
import SortContainer           from './containers/SortContainer'
import RootPageContainer       from './containers/RootPageContainer'
import CategoriesContainer     from './containers/categories/CategoriesContainer'

import './App.css';

class App extends Component {

  componentDidMount = () =>{
    this.props.getCategories();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/*<Route exact path="/" component={HomePage} />*/}
          <Route exact path="/addpost" component={PostFormPage} />
          <Route exact path="/:filter?" render={({location, match:{params}}) =>
              <div className="App">
                renderApp
                <Header /> {/*Title*/}
                {/*<NavBarContainer /> {/*Nav Bar Categories*/}
                <CategoriesContainer location={location}  /> {/*Nav Bar Categories*/}
                <SortContainer /> {/*NavBar to sort post by..*/}
                <RootPageContainer  filter={params.filter}/> {/*postlist*/}
              </div>
            }
          />

        <Route path="/:categoryUrl/:postId/" component={PostPageContainer}/>
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
