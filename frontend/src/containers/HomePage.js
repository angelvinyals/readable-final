import React from 'react';
//import PropTypes from 'prop-types';
//import { connect } from 'react-redux';

//import { Formik, Form, Field } from "formik";
//import yup from "yup";
import Categories from './categories';
import Posts from './posts';
import Sorting from './sorting';
import Form from './form-props-render';

//import './App.css';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categ:[],
      posts:[],
      sortingPosts:{
        newestFirst:false,
        oldestFirst: true,
        mostVotedFirst:false,
        minusVotedFirst: false,
      }

    };
    this.handleCategories = this.handleCategories.bind(this);
    this.handleClickButton = this.handleClickButton.bind(this); 
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
    const filteredPosts= this.notDeletedPosts(posts)
    this.setState({
      posts:filteredPosts      
    })     
  }

  notDeletedPosts = (posts) =>{    
      console.log('not deleted posts begins')
      const postsIsDeletedFalse= posts.filter(post => post.deleted===false)
      return postsIsDeletedFalse    
  }

  sortingPosts =(posts)=>{
    if(posts){
      const {newestFirst, oldestFirst, mostVotedFirst, minusVotedFirst,}=this.state.sortingPosts
      let sortPosts = []
      switch(true) {        
        case newestFirst:
            console.log('newest first')
            return posts.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp))
            break;
        case oldestFirst:
            console.log('oldest first')
            return posts.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp))
            break;
        case mostVotedFirst:
            console.log('most Voted first')
            return posts.sort((a,b) =>  b.voteScore - a.voteScore)
            break;
        case minusVotedFirst:
            console.log('minus Voted first')
            return posts.sort((a,b) => a.voteScore - b.voteScore)
            break;
        default:
            return
      }
    } else {
      return (
        console.log('there is no posts to sort')
      )
    } 
  }

  handleClickButton(e){
    e.preventDefault();
    let sortingState = this.state.sortingPosts
    for(let key in sortingState) {
      if(key === e.target.value) {
          sortingState[key] = true;
      } else {
        sortingState[key] = false;
      }
    }
    this.setState({
      sortingPosts:sortingState
    })
    this.sortingPosts(this.state.posts)
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
      <Sorting
        type = {this.state.sortingPosts}
        render={() => {
           return(
            <div>
              <button onClick={this.handleClickButton} value="newestFirst">New</button>
              <button onClick={this.handleClickButton} value="oldestFirst">Oldest</button>
              <button onClick={this.handleClickButton} value="mostVotedFirst">+ Voted</button>
              <button onClick={this.handleClickButton} value="minusVotedFirst">- Voted</button>
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
              {this.state.posts.length>0 &&
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