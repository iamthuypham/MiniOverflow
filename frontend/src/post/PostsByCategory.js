import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null
    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
      	A bunch of posts
      </div>
    )
  }
}

export default App;
