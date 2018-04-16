import React from 'react';
//import PropTypes from 'prop-types';
//import { connect } from 'react-redux';

//import { Formik, Form, Field } from "formik";
//import yup from "yup";
import Categories from './categories';
import Posts from './posts';
import Form from './form-props-render';

//import './App.css';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categ:[],
      posts:[]

    };
    this.handleCategories = this.handleCategories.bind(this);
  }

  handleCategories(newCateg){
    this.setState({
      categ:newCateg
    })
      
  }

  handleNewPost = (newPost) =>{
    console.log('handleNewPost begin....')
    console.log(newPost)
    this.setState(prevState => ({
      posts:[
        ...prevState.posts,
        newPost
      ]      
    }))      
  }

  handleFetchingPost = (posts) =>{
    console.log('handleFetchingPost begin....')
    console.log(posts)
    this.setState({
      posts:posts      
    })     
  }

  render(props){
    return(
    <div>
      <Categories
        categ= {this.handleCategories}
        url="http://localhost:3001/categories"
        render={({ categories, isLoading },{categ}) => {
          if(categories.length===0){return null}

          return(
          <div>
            <h2>Categories</h2>
            {isLoading && <h2>Loading...</h2>}
            {console.log(JSON.stringify(isLoading))}
            {console.log(JSON.stringify(categ))}
            {console.log(JSON.stringify(categories))}
            
            <ul>
              {categories.length > 0 && categories.map(cat => (
                <li key={cat.path}>
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        } 
      />
      <Posts
        url="http://localhost:3001/posts"
        fetchingPosts={this.handleFetchingPost} 
        render={({isLoading }) => (
          <div>
            <h2>Posts</h2>
            {isLoading && <h2>Loading...</h2>}
            <ul>
              {Object.keys(this.state.posts).length>0 &&
                Object.keys(this.state.posts)
                  .map(key => this.state.posts[key])
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
          categ= {this.state.categ} 
          newPost={this.handleNewPost}   
          url="http://localhost:3001/posts"
          render={({handleChange, isLoading,value },{categ}) => (
            <div>
              {console.log(categ)}
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
                    {categ.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}         
                  </select>
                </label>
              </div>
              <input type="submit" value="add a post" />            
            </div>
          )} 
        />   
      </div>
    </div>
  )}
} 

export default HomePage