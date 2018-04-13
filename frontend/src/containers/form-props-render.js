import React from 'react';
import uuid from 'uuid';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post:{
        title: '',
        body:'',
        author:'',
        category:'react'
      },
      isSaving: false,
      

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange =(e)=> {
    console.log(e.target)
    e.persist();
    this.setState(prevState => ({
      post:{
        ...prevState.post,
        [e.target.name]:e.target.value
        
      }
    }))
  }

  handleSubmit(event) {
    console.log(event)
    event.preventDefault();
    const newPost ={
      id: uuid.v4(),
      timestamp: Date.now(),
      ...this.state.post
    }
    console.log(newPost)
    this.setState({ isSaving: true });
    this._fetch(newPost)

  }

    headers = {
    'Authorization': 'whatever-you-want',
    'content-type': 'application/json',
    'cache-control': 'no-cache',
  };

    _fetch = async (postToSave) => {
      console.log(postToSave)
      const res = await fetch(this.props.url, {
        method: 'POST',
        headers: {
            ...this.headers
        },
        body: JSON.stringify(postToSave)
      });

      const json = await res.json();
      await console.log(json)
      await this.setState({ isSaving: false})
      await this.props.newPost(json)
  }

  render() {

      return (
        <form onSubmit={this.handleSubmit}>
          {this.props.render({
            isSaving:this.state.isSaving,
            handleChange: this.handleChange,           
          },
          this.props)}
        </form>
      )
  }
}

export default Form
