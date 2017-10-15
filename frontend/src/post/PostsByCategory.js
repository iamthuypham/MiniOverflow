import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import PostItem from './PostItem';
import { fetchPostsByCategory } from './action';
import PostForm from './PostForm';

class PostsByCategory extends Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.routing.match.params.category !== nextProps.routing.match.params.category) {
      	const nextCategoryNameParam = nextProps.routing.match.params.category
    	nextProps.dispatchFetchPostsByCategories(nextCategoryNameParam)
    }
  }
  componentDidMount() {    
    const categoryNameParam = this.props.routing.match.params.category
    this.props.dispatchFetchPostsByCategories(categoryNameParam)
  }

  render() {
    const { isFetching, posts, location, categories } = this.props
    const categoryNameParam = this.props.routing.match.params.category
    console.log(this.props)
    return (
      <div>
      	<PostForm category={categoryNameParam} categories={categories}/>
      	{!isFetching && posts.map((post) => 
             <PostItem key={post.id} post={post} categoryOfThisPost={categoryNameParam}/>      
        )}
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { posts, isFetching } = state.PostReducer.getPostsByCategoryReducer
  return { 
    posts,
    isFetching
         }
}

const mapDispatchToProps = (dispatch) => ({
  	dispatchFetchPostsByCategories: (categoryName) => dispatch(fetchPostsByCategory(categoryName))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsByCategory);
