import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostItem from './PostItem';
import PostForm from './PostForm';
import { fetchInitialPosts, resetPosts, fetchAddPost } from './action';

class AllPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	openPostForm: false
    }
    this.handlePostForm = this.handlePostForm.bind(this)
    this.handleSubmitRequest = this.handleSubmitRequest.bind(this)
  }
  componentDidMount() {
    this.props.dispatchResetPosts()
    this.props.dispatchFetchInitialPosts()
  }
  handlePostForm() {
  	this.setState({openPostForm: !this.state.openPostForm})
  }
  handleSubmitRequest(post) {
  	this.props.dispatchFetchAddPost(post,this.props.currentPosts)
    this.setState({ openPostForm: false })
  }

  render() {
    const { currentPosts } = this.props
    const categoryNameParam = this.props.routing.match.params.category
    return (
      <div>
      	<button onClick={this.handlePostForm}>Add Post</button>
      	{ this.state.openPostForm &&
      		<PostForm category={categoryNameParam} onSubmitRequest={this.handleSubmitRequest}/>
      	}
      	{currentPosts.map((post) => 
             post.id && !post.deleted && <PostItem key={post.id} post={post} categoryOfThisPost={post.category}/>      
        )}
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  let currentPosts
  const initialPosts = state.PostReducer.InitialPostsReducer.posts
  const { posts, isInitial } = state.PostReducer.CurrentPostsReducer
  console.log("at All Posts")
  console.log(isInitial)
  if (isInitial) {
    currentPosts = initialPosts
  } else {
  	currentPosts = posts
  }
  return { currentPosts}
}

const mapDispatchToProps = (dispatch) => ({
  	dispatchFetchInitialPosts: () => dispatch(fetchInitialPosts()),
  	dispatchResetPosts: () => dispatch(resetPosts()),
  	dispatchFetchAddPost: (post, posts) => dispatch(fetchAddPost(post, posts))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPosts);
