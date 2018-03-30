import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCategories } from './actions/categoriesActions';
import './App.css';

class App extends Component {

  componentDidMount = () =>{
    this.props.getCategories();
  }

  render() {
    return (
      <div>app</div>
    );
  }
}

App.propTypes ={
  getCategories: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(fetchCategories()),
});

export default connect(null, mapDispatchToProps)(App);
