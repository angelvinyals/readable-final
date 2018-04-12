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

<<<<<<< HEAD
App.propTypes ={
  getCategories: PropTypes.func.isRequired
}
=======
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
    <Posts
      url="http://localhost:3001/posts"
      render={({ posts, isLoading }) => (
        <div>
          <h2>Posts</h2>
          {isLoading && <h2>Loading...</h2>}
          <ul>
            {Object.keys(posts).length>0 &&
              Object.keys(posts)
                .map(key => posts[key])
                .map(p => (
                  <li key={`p${p.id}`}>
                    <ul>
                      {Object.keys(p).map(k =>(
                          <li key={`${p.id}-${k}`}>
                            {`${k}: ${p[k]}`}
                          </li>
                      ))}
                    </ul>
                    <hr/>
                  </li>
                ))
            }
          </ul>
        </div>
      )}
    />
    <button >
      add a post
    </button>
    <div className="container">
      <Form
        categories={['a props','bb props','ccc props']}
        render={({ categories, isLoading }) => (
          <div>
            <div>
              <label>
                Title:
                <input type="text" name="title" onChange={this.handleChange} />
              </label>
            </div>
            <div>
              <label>
                Post:
                <textarea name="body" onChange={this.handleChange} />
              </label>
            </div>
            <div>
              <label>
                Author:
                <input type="text" name="author" onChange={this.handleChange} />
              </label>
            </div>
            <div>
              <label>
                Pick your category:
                <select name="category" onChange={this.handleChange}>
                  {['p','q'].map(cat => <option value={cat} key={`option${cat}`}>{cat}</option>)}         
                </select>
              </label>
            </div>
            <input type="submit" value="add a post" />

          </div>
        )}
      />
    </div>
  </div>
)
>>>>>>> 96d5eacef8bf0131184353f0866dbc94998ad119

const mapDispatchToProps = dispatch => ({
  //getCategories: () => dispatch(fetchCategories()),
  //getPosts: () => dispatch(fetchPosts()),
});

export default connect(null, mapDispatchToProps)(App);
