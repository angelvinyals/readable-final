import React from 'react';
//import PropTypes from 'prop-types';
//import { connect } from 'react-redux';

//import { Formik, Form, Field } from "formik";
//import yup from "yup";
import Categories from './categories';
import Posts from './posts';
import Comments from  './comments'
import Sorting from './sorting';
import Form from './form-props-render';

//import './App.css';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categ:[],
      posts:[],
      postsfiltered:[],
      sortingPosts:{
        newestFirst:false,
        oldestFirst: true,
        mostVotedFirst:false,
        minusVotedFirst: false,
      },
      viewFormAddPost:false,
      viewPostDetails:'',
      comments:[]

    };
    this.handleCategories = this.handleCategories.bind(this);
    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleClickCategories = this.handleClickCategories.bind(this); 
    this.handleClickToogleForm = this.handleClickToogleForm.bind(this);
    this.handleClickPostTitle = this.handleClickPostTitle.bind(this);
    this.handleClickVotePost = this.handleClickVotePost.bind(this);

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
    const postObject = this.arrayToObject(posts,  "id")
    const filteredPosts= this.notDeletedPosts(posts)    
    
    this.setState({
      posts:postObject,
      postsfiltered: filteredPosts     
    })
    return console.log(this.state.postsfiltered)     
  }

  arrayToObject = (array, keyField) =>
   array.reduce((obj, item) => {
     obj[item[keyField]] = item
     return obj
   }, {})

  notDeletedPosts = (posts) =>{    
      console.log('not deleted posts begins')
      const postsIsDeletedFalse=Object.values(posts).filter(post => post.deleted===false)
      const postObject = this.arrayToObject(postsIsDeletedFalse,  "id")
      console.log(postObject)
      return postObject
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
    this.sortingPosts(this.state.postsfiltered)
  }

   sortingPosts =(posts)=>{
    if(posts){
      const {newestFirst, oldestFirst, mostVotedFirst, minusVotedFirst,}=this.state.sortingPosts
      let dataOrdered = {}
      switch(true) {        
        case newestFirst:
            console.log('newest first')            
            dataOrdered= this.dataObject_ordered(posts,'timestamp','ascending')
            return this.setState({
              postsfiltered:dataOrdered
            })
            
        case oldestFirst:
            console.log('oldest first') 
            dataOrdered= this.dataObject_ordered(posts,'timestamp','descending')       
            return this.setState({
              postsfiltered:dataOrdered
            })
            
        case mostVotedFirst:
            console.log('most Voted first')
            dataOrdered= this.dataObject_ordered(posts,'voteScore','ascending')       
            return this.setState({
              postsfiltered:dataOrdered
            })
            
        case minusVotedFirst:
            console.log('minus Voted first')
            dataOrdered= this.dataObject_ordered(posts,'voteScore','descending')       
            return this.setState({
              postsfiltered:dataOrdered
            })
            
        default:
            return
      }
    } else {
      return (
        console.log('there is no posts to sort')
      )
    } 
  }


 
  dataObject_ordered = (dataObject,key,sortType) =>{
    //Object.values(data).sort(this.sortByKey('timestamp'))
    const ArrayOrdered = Object.values(dataObject).sort(this.sortByKey(key,sortType))
    return this.arrayToObject(ArrayOrdered, 'id')
  }
      
  sortByKey = (key,typeSort) => {
    console.log(key, typeSort)
    if (typeSort==="ascending") {
      console.log('ascending')
      return (a,b) => Number(b[key]) - Number(a[key])
    } else {
      console.log('descending')
      return (a,b) => Number(a[key]) - Number(b[key])
    }
  } 


  handleClickCategories(e){
     e.preventDefault();
     const {posts}=this.state
     let postbycategory ={}
     let arrayFilteredbycategory =[]
     if(posts){    
      switch(e.target.value) {        
        case 'all':
            console.log('case all categories selected')
            return this.setState({
              postsfiltered: posts
              })
            
        case 'react':
            console.log('case react category selected')
            arrayFilteredbycategory =  Object.values(posts).filter(post => post.category=== 'react')
            postbycategory = this.arrayToObject(arrayFilteredbycategory, 'id')
            return this.setState({
              postsfiltered:postbycategory
              })
            
        case 'redux':
            console.log('case redux category selected')
            arrayFilteredbycategory =  Object.values(posts).filter(post => post.category=== 'redux')
            postbycategory = this.arrayToObject(arrayFilteredbycategory, 'id')
            return this.setState({
              postsfiltered:postbycategory
              })
            
        case 'udacity':
            console.log('case udacity category selected')
            arrayFilteredbycategory =  Object.values(posts).filter(post => post.category=== 'udacity')
            postbycategory = this.arrayToObject(arrayFilteredbycategory, 'id')
            return this.setState({
              postsfiltered:postbycategory
              })
            
      default:
            return
      }
    } else {
      return (
        console.log('there is no posts to sort')
      )
    } 
  }

  handleClickToogleForm(){
    console.log('handleClickToogleForm begins....')
    this.setState({ viewFormAddPost: !this.state.viewFormAddPost })
  }

  handleClickPostTitle(e){
    console.log('handleClickPostTitle begins...')
    e.preventDefault()
    console.log(e.target.value)
    this.setState({ viewPostDetails: e.target.value })
  }

  handleFetchingComments = (comments) =>{
    console.log('handleFetchingComments begin....')
    console.log(comments)
    this.setState({
      comments: comments
    })     
  }

  handleClickVotePost =(sign,e) =>{
    console.log('handleClickVotePost')
    const {postsfiltered} = this.state
    const postId= e.target.value
    let oldScore= (postsfiltered[postId].voteScore)
    let newScore=''
    if (sign==="+"){
      newScore = oldScore+1;
    } else {
      newScore = oldScore-1;    
    }
    return  this.setState({
      postsfiltered:{
        ...this.state.postsfiltered,
        [postId]:{
          ...this.state.postsfiltered[postId],
          ["voteScore"]: newScore
        }
      }});
    return
  }
  
  handleClickDeletePost =(e) =>{
    console.log('handleClickDeletePost')
    console.log(e.target.value)
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
            <div>
              <button onClick={this.handleClickCategories} value='all'>all</button>
              {categories.length > 0 && categories.map(cat => (             
                  <button onClick={this.handleClickCategories} value={cat.name}>{cat.name}</button>    
              ))}
            </div>
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
      <button onClick={this.handleClickToogleForm} value="toogleForm">see form to add a post</button>
      {this.state.viewFormAddPost &&    
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
      } 
      <Posts
        url="http://localhost:3001/posts"
        fetchingPosts={this.handleFetchingPost} 
        render={({isLoading }) => (
          <div>
            <h2>Posts</h2>
            {isLoading && <h2>Loading...</h2>}  

            <ul>
              {Object.keys(this.state.postsfiltered).length>0 &&
                Object.values(this.state.postsfiltered).map(p => (                    
                  <li key={`p${p.id}`}>
                    <ul>
                      {Object.keys(p).map(k =>(
                          k==='title'? 
                            <li key={`${p.id}-${k}`}>
                              <button  onClick={(e) => this.handleClickVotePost('+', e)} value={`${p.id}`}>{`+`}</button>
                              <button  onClick={(e) => this.handleClickVotePost('-', e)} value={`${p.id}`}>{`-`}</button>
                              <button  onClick={this.handleClickPostTitle} value={`${p.id}`}>{`${k}: ${p[k]}`}</button>
                              <button  onClick={this.handleClickDeletePost} value={`${p.id}`}>{`X`}</button>
                            </li>                       
                          :
                            <li key={`${p.id}-${k}`}>
                              {`${k}: ${p[k]}`}
                            </li>
                      ))}
                    </ul>
                    <hr/>
                  </li>
                ))              
              }
              {this.state.viewPostDetails.length>0 && 

                    <Comments
                      url={`http://localhost:3001/posts/${this.state.viewPostDetails}/comments`}
                      fetchingComments={this.handleFetchingComments} 
                      postId= {this.state.viewPostDetails}
                      render={()=>(
                          <div>
                            <h2>Comments</h2>
                          </div>
                        )}
                    />
              }
            </ul>
          </div>
        )} 
      />
      
    </div>
  )}
} 

export default HomePage