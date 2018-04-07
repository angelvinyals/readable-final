import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { connect } from 'react-redux';
import { Formik, Form, Field } from "formik";
import yup from "yup";
import Categories from './containers/categories';
import Posts from './containers/posts';
import PostsList from './containers/postsList';
import AjaxForm from './containers/AjaxForm'
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
        <AjaxForm
          url="http://localhost:3001/posts"
          fields={["title", "body","author", "category"]}
          onSuccess={() => {
              <div>
                is a success
              </div>
            // redirect or show toast. whatever you want
          }} 
          render={({ error, sendRequest }) => (
          <div>
            <h2>New Post</h2>

            {error && (
              <div className="alert alert-danger">
                <h3>oops...</h3>
                <pre>{error}</pre>
              </div>
            )}

            <Formik
              initialValues={{
                title: "",
                body: "",
                author:"",
                category:"",
              }}
              validationSchema={yup.object().shape({
                title: yup.string().required(),
                body: yup.string().required(),
                author: yup.string().required(),
                category: yup.string().required(),
              })}
              onSubmit={sendRequest}
              render={({ isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <Field type="text" name="title" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="body">Body</label>
                    <Field type="text" name="body" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="author">author</label>
                    <Field type="text" name="author" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">category</label>
                    <Field type="text" name="category" className="form-control" />
                  </div>

                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </Form>
              )} />
          </div>
        )} />
      </div>
  </div>
);

export default App
