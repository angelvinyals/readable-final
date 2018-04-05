import React, { Component } from 'react';
import PropTypes from 'prop-types';


class PostList extends React.Component {

  render() {
  	const {posts}= this.props
  	console.log(posts.length)
  	let postsArr =[]
  	if (Object.keys(posts).length > 0) {
  		postsArr = Object.keys(posts).map(key => posts[key])
  		console.log(Object.keys(postsArr))
  	}
  	console.log(postsArr)
    return (
    	<div>
    		{posts.length === 0 && <h5>Loading posts...</h5>}
    		{posts.length > 0 && 
    			<div>
    				....
    			</div>
    			
    		}
    	</div>
    	
    )
    	
  }
}



export default PostList
