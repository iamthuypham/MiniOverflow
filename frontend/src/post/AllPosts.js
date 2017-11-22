import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostItem from './PostItem';
import PostForm from './PostForm';
import { fetchInitialPosts, fetchAddPost } from './action';

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
    this.props.dispatchFetchInitialPosts()
  }
  handlePostForm() {
  	this.setState({openPostForm: !this.state.openPostForm})
  }
  handleSubmitRequest(post) {
    console.log(post)
  	this.props.dispatchFetchAddPost(post,this.props.posts)
    this.setState({ openPostForm: false })
  }

  render() {
    const { posts } = this.props
    const categoryNameParam = this.props.routing.match.params.category
    return (
      <div>
      	<button onClick={this.handlePostForm}>Add Post</button>
      	{ this.state.openPostForm &&
      		<PostForm category={categoryNameParam} onSubmitRequest={this.handleSubmitRequest}/>
      	}
      	{posts.map((post) => 
             post.id && <PostItem key={post.id} post={post} categoryOfThisPost={post.category}/>      
        )}
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  let posts
  const initialPosts = state.PostReducer.InitialPostsReducer.posts
  const currentPosts = state.PostReducer.CurrentPostsReducer.posts
  if (currentPosts.length) {
    posts = currentPosts
  } else {
  	posts = initialPosts
  }
  return {posts}
}

const mapDispatchToProps = (dispatch) => ({
  	dispatchFetchInitialPosts: () => dispatch(fetchInitialPosts()),
  	dispatchFetchAddPost: (post, posts) => dispatch(fetchAddPost(post, posts))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPosts);
