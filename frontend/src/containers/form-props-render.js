import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body:'',
      author:'',
      category:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  handleChange =(e)=> {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const newPost ={
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category,


    }
    console.log(newPost)
   
  }

  render() {
      return this.props.render(this.state);
  }
}

export default Form