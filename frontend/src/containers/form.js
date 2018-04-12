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
    alert('An essay was submitted: ' + newPost.title);
    console.log(newPost)

  }

  render() {
    const {categories} = this.props
    return (
      <form
        onSubmit={this.handleSubmit}
        key="addFormPost"
        
        >
        <div>
          <label>
            Title:
            <input type="text" name="title" onChange={this.handleChange} />
          </label>
        </div>
        <div>
          <label>
            Post:
            <textarea name="body" onChange={this.handleChange} />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input type="text" name="author" onChange={this.handleChange} />
          </label>
        </div>
        <div>
          <label>
            Pick your category:
            <select name="category" onChange={this.handleChange}>
              {categories.map(cat => <option value={cat}>{cat}</option>)}
            </select>
          </label>
        </div>
        <input type="submit" value="add a post" />
      </form>
    );
  }
}

export default Form
