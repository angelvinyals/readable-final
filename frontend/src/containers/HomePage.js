import React from 'react';
//import PropTypes from 'prop-types';
//import { connect } from 'react-redux';

//import { Formik, Form, Field } from "formik";
//import yup from "yup";
import Categories from './categories';
import Posts from './posts';
import Form from './form-props-render';

//import './App.css';

const HomePage = () => (
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
        url="http://localhost:3001/posts"
        render={({handleChange, categories, isLoading,value }) => (
          <div>
            <div>
              <label>
                Title:
                <input type="text" name="title" onChange={handleChange} />
              </label>
            </div>
            <div>
              <label>
                Post:
                <textarea name="body" onChange={handleChange} />
              </label>
            </div>
            <div>
              <label>
                Author:
                <input type="text" name="author" onChange={handleChange} />
              </label>
            </div>
            <div>
              <label>
                Pick your category:
                <select name="category" onChange={handleChange} value={value}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}         
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


export default HomePage