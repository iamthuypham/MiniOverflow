import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Post = props => (
  <div><Link to={`/${props.categoryOfThisPost}/${props.post.id}`}>{props.post.author} - {props.post.title} - {props.post.body} - {props.post.voteScore}</Link></div>
)
Post.PropTypes = {
  post: PropTypes.object.isRequired,
  categoryOfThisPost: PropTypes.string.isRequired
}

export default Post
