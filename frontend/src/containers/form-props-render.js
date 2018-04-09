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
        category:''
      },
      isSaving: false

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
      id: uuid.v4(),
      timestamp: Date.now(),
      ...this.state.post
    }
    console.log(newPost)

  }

    headers = {
    Authorization: 'what ever you want',
    'content-type': 'application/json',
    'cache-control': 'no-cache',
  };

    _fetch = async () => {
      const res = await fetch(this.props.url, {
        method: 'POST',
        headers: {
            ...this.headers
        },
        body: JSON.stringify(this.newPost)
      });

      const json = await res.json();

      this.setState({
        categories: json.categories,
        isLoading: false,
      });
  }

  componentDidMount() {
      this.setState({ isSaving: true }, this._fetch);
  }


  render() {
      return this.props.render(this.state);
  }
}

export default Form
