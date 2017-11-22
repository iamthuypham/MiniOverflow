import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import { fetchOnePost } from './action';
import { fetchThisPostComments } from '../comment/action';
import Comment from '../comment/Comment';

class PostWithComments extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {    
    const postIdParam = this.props.match.params.post_id
    console.log(this.props)
    this.props.dispatchFetchOnePost(postIdParam)
    //this.props.dispatchFetchThisPostComments(postIdParam)
  }

  render() {
    const { isFetching, post, comments } = this.props
    console.log(this.props)
    return (
      <div>
      	<div>{post.author} - {post.title} - {post.body} - {post.voteScore}</div>
      	
      </div>
    )
  }
}

function mapStateToProps (state) {
  console.log(state)
  const { post, isFetching } = state.PostReducer.getOnePostReducer
  return {post, isFetching}
}

const mapDispatchToProps = (dispatch) => ({
  	dispatchFetchOnePost: (postId) => dispatch(fetchOnePost(postId)),
  	
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostWithComments);
