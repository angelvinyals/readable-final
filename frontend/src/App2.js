import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { connect } from 'react-redux';
import Categories from './containers/categories';
import Posts from './containers/posts';
import './App.css';

const App = () => (
  <div>
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
      )} />
      <Posts 
      url="http://localhost:3001/posts"
      render={({ posts, isLoading }) => (
        <div>
          <h2>Posts</h2>
          {isLoading && <h2>Loading...</h2>}

          <ul>
            {posts.length > 0 && Object.assign(
              ...Object.keys(posts).map(k => 
                (<li key={k}>{k}</li>)
              )
            )}
          </ul>
        </div>
      )} />
  </div>
);

export default App





