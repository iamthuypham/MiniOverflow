import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Link, withRouter } from 'react-router-dom';

import Category from './category/Category';
import PostsByCategory from './post/PostsByCategory';
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
    const { isFetching, categories, location } = this.props
    return (
      <div className='App'>
      	<header>
          <Link to='/categories'>Home</Link>
      	  {!isFetching && categories.categories.map((category) => 
      		 <Category key={category.name} categoryName={category.name} categoryPath={category.path}/>      
    	  )}
        </header>
		<main>
			<Route exact path='/:categories/posts' component={PostsByCategory}/>
		</main>
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
