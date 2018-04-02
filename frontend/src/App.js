import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { fetchCategories } from './actions/categoriesActions';

//import PostFormPage        from './components/PostFormPage';
import Header              from './components/Header';

import PostAddContainer       from './containers/PostAddContainer';
import SortContainer           from './containers/SortContainer'
import PostsListContainer       from './containers/PostsListContainer'
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
          {/*<Route exact path="/addpost" component={PostFormPage} />*/}
          <Route exact path="/addpost" render={({history}) =>
              <div className="App">
                renderApp- addpost
                <Header /> {/*Title*/}
                <PostAddContainer history={history} /> {/*form to add post*/}
              </div>
            }
          />
          <Route exact path="/:filter?" render={({location, match:{params}}) =>
              <div className="App">
                renderApp
                <Header /> {/*Title*/}
                <CategoriesContainer location={location}  /> {/*Nav Bar Categories*/}
                <SortContainer /> {/*NavBar to sort post by..*/}
                <PostsListContainer  filter={params.filter}/> {/*postlist*/}
              </div>
            }
          />

        <Route path="/:categoryUrl/:postId/" component={PostAddContainer}/>
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
