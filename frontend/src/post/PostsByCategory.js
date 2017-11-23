import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostItem from './PostItem';
import PostForm from './PostForm';
import { fetchInitialPosts, fetchAddPost, resetPosts, fetchDeletePost } from './action';

class PostsByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	openPostForm: false
    }
    this.handlePostForm = this.handlePostForm.bind(this)
    this.handleSubmitRequest = this.handleSubmitRequest.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    this.props.dispatchResetPosts()
    this.props.dispatchFetchInitialPosts()
  }
  handlePostForm() {
  	this.setState({openPostForm: !this.state.openPostForm})
  }
  handleSubmitRequest(post) {
  	this.props.dispatchFetchAddPost(post,this.props.postsByCategory)
    this.setState({ openPostForm: false })
  }
  handleDelete(post, e) {
    e.preventDefault()
    this.props.dispatchFetchDeletePost(post, this.props.postsByCategory)
  }

  render() {
    const { postsByCategory } = this.props
    const categoryNameParam = this.props.routing.match.params.category
    return (
      <div>
      	<button onClick={this.handlePostForm}>Add Post</button>
      	{ this.state.openPostForm &&
      		<PostForm category={categoryNameParam} onSubmitRequest={this.handleSubmitRequest}/>
      	}
      	{postsByCategory.map((post) => 
          !post.deleted &&
          <div key={post.id}>
            <PostItem post={post} categoryOfThisPost={post.category}/>
            <input
              type='button'
              value='Delete'
              onClick={(e) => this.handleDelete(post, e)}
            />
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  let postsByCategory
  const currentCategory = ownProps.routing.match.params.category
  const initialPostsByCategory = state.PostReducer.InitialPostsReducer.posts
  const { posts, isInitial } = state.PostReducer.CurrentPostsReducer
  if (isInitial) {
    postsByCategory = initialPostsByCategory.filter((post) => post.category === currentCategory && !post.deleted)
  } else {
  	postsByCategory = posts.filter((post) => post.category === currentCategory && !post.deleted)
  }
  return {postsByCategory}
}

const mapDispatchToProps = (dispatch) => ({
  	dispatchFetchInitialPosts: () => dispatch(fetchInitialPosts()),
  	dispatchFetchAddPost: (post, posts) => dispatch(fetchAddPost(post, posts)),
  	dispatchResetPosts: () => dispatch(resetPosts()),
  	dispatchFetchDeletePost: (post, posts) => dispatch(fetchDeletePost(post, posts))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsByCategory);


  