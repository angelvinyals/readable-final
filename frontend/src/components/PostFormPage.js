import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';


class PostFormPage extends Component {

  render() {
    return (
        <div>
         <Header />
         addpost FORM
        </div>
    );
  }
}

PostFormPage.propTypes ={
  getCategories: PropTypes.func.isRequired
}

export default PostFormPage;
