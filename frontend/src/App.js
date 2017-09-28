import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route, Link } from 'react-router-dom';

import Category from './category/Category';
import { fetchCategories } from './category/action';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null
    }
  }
  componentDidMount() {    
    this.props.dispatchFetchCategories()
  }

  render() {
    const { isFetching, categories } = this.props
    return (
      <div className='App'>
      	<header>
          <a href='/categories'>Home</a>
      	  {!isFetching && categories.categories.map((category) => 
      		 <Category key={category.name} categoryName={category.name}/>      
    	  )}
        </header>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { categories, isFetching } = state.CategoryReducer.getAllCategories
  return { 
    categories,
    isFetching
         }
}

const mapDispatchToProps = (dispatch) => ({
  	dispatchFetchCategories: () => dispatch(fetchCategories())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
