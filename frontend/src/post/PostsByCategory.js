import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import PostItem from './PostItem';
import { fetchAllPosts, fetchPostsByCategory } from './action';
import { fetchAddPost } from './action';
import PostForm from './PostForm';

class PostsByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	openPostForm: false
    }
    this.handlePostForm = this.handlePostForm.bind(this)
    this.handleSubmitRequest = this.handleSubmitRequest.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.routing.match.params.category !== nextProps.routing.match.params.category) {
      	const nextCategoryNameParam = nextProps.routing.match.params.category
    	nextProps.dispatchFetchPostsByCategories(nextCategoryNameParam)
    }
    if (this.props.posts !== nextProps.posts) {
    	this.setState({ openPostForm: false })
    }
  }
  componentDidMount() {    
    const categoryNameParam = this.props.routing.match.params.category
    this.props.dispatchFetchPostsByCategories(categoryNameParam)
    this.props.dispatchFetchAllPosts()
  }
  handlePostForm() {
  	this.setState({openPostForm: !this.state.openPostForm})
  }
  handleSubmitRequest(post) {
  	this.props.dispatchFetchAddPost(post,this.props.posts)
  }

  render() {
    const { isFetching, posts, location, categories, allPosts } = this.props
    console.log(allPosts)
    const categoryNameParam = this.props.routing.match.params.category
    console.log(this.props)
    return (
      <div>
      	<button onClick={this.handlePostForm}>Add Post</button>
      	{ this.state.openPostForm &&
      		<PostForm category={categoryNameParam} categories={categories} onSubmitRequest={this.handleSubmitRequest}/>
      	}
      	{!isFetching && posts.map((post) => 
             <PostItem key={post.id} post={post} categoryOfThisPost={categoryNameParam}/>      
        )}
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  console.log(state)
  console.log(ownProps)
  const { isFetching } = state.PostReducer.getPostsByCategoryReducer
  const { isAdded } = state.PostReducer.addPostReducer
  const allPosts = state.PostReducer.getAllPostsReducer.posts
  let posts;
  if (ownProps.routing.match.path === '/'){
  	posts = allPosts
  } else if (isAdded) {
    posts = state.PostReducer.addPostReducer.posts.filter(post => post.category === ownProps.routing.match.params.category)
  } else {
  	posts = state.PostReducer.getPostsByCategoryReducer.posts
  }
  return { posts, isFetching }
}

const mapDispatchToProps = (dispatch) => ({
  	dispatchFetchAllPosts: () => dispatch(fetchAllPosts()),
  	dispatchFetchPostsByCategories: (categoryName) => dispatch(fetchPostsByCategory(categoryName)),
  	dispatchFetchAddPost: (post, posts) => dispatch(fetchAddPost(post, posts))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsByCategory);
