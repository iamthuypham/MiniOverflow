import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import Post from './Post';
import { fetchPostsByCategory } from './action';

class PostsByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null
    }
  }
  
  componentDidMount() {    
    const categoryParam = this.props.match.params.categories
    this.props.dispatchFetchPostsByCategories(categoryParam)
  }

  render() {
    const { isFetching, posts, location } = this.props
    console.log(this.props)
    return (
      <div>
      	{!isFetching && posts.map((post) => 
             <Post key={post.id} post={post}/>      
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
  	dispatchFetchPostsByCategories: (category) => dispatch(fetchPostsByCategory(category))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsByCategory);
