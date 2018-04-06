import React, { Component } from 'react';
import PropTypes from 'prop-types';


class PostList extends React.Component {

  render() {
  	const {posts}= this.props
  	console.log(posts.length)
  	let postsArr =[]
  	if (Object.keys(posts).length > 0) {
  		postsArr = Object.keys(posts).map(key => posts[key])
      console.log(postsArr)
  	}
    return (

    	<div>
        {posts.length === 0 && <h5>Loading posts...</h5>}
        {postsArr.length > 0 && postsArr.map(p => (
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

        ))}
    	</div>

    )

  }
}



export default PostList
