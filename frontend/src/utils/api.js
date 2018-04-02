import 'cross-fetch/polyfill'
import uuid from 'uuid';
const url= 'http://localhost:3001'

const headers = {
  Authorization: 'whatever-you-want',
  'Content-type': 'application/json',
};

//GET CATEGORIES..............................................

export const getCategories = () =>
  fetch(`${url}/categories`, {
    method: 'GET',
    headers: {
      ...headers,
    },
  })
    .then(res => res.json())
    .then(data => data.categories);

// GET POST..............................................

export const getPosts = () =>{
  return fetch(`${url}/posts`, {
    method: 'GET',
    headers: {
      ...headers,
    },
  })
  .then(handleErrors)
  .then(res => res.json())
  .then(data => data);
}

//ADD a POST......................................

export const savePost = (parcialPost) =>{

  const post = {
    id: uuid.v4(),
    timestamp: Date.now(),
    ...parcialPost,
  };

  return fetch(`${url}/posts`,{
        method: 'POST',
        headers:{
          ...headers,
        },
        body: JSON.stringify(post)
      })
    .then(handleErrors)
    .then(res => res.json())
}

//DELETE a POST......................................

export const deletePost = (id) =>{

  return fetch(`${url}/posts/${id}`,{
        method: 'DELETE',
        headers:{
          ...headers,
        },
      })
    .then(handleErrors)
    .then(res => res.json())
}

//ADD a VOTE......................................


// Handle HTTP errors since fetch won't........
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}


export const saveVote = ({id, postOrComment, option}) => {

      console.log(id)
      console.log(postOrComment)
      console.log(option)

    return fetch(`${url}/${postOrComment}/${id}`, {
      method: 'POST',
      headers: {
        ...headers,
      },
      body: JSON.stringify(option),
    })
    .then(handleErrors)
    .then(data => data.json())
  };


  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
