import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import Category from './category/Category';
import PostsByCategory from './post/PostsByCategory';
import PostWithComments from './post/PostWithComments';
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
			<Route exact path='/:category' render={(props)=><PostsByCategory categories={categories} routing={props}/>}/>
			<Route exact path='/:category/:post_id' component={PostWithComments}/>
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
