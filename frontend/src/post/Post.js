import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

const Post = props => (
  <div>{props.post.author} - {props.post.title} - {props.post.body} - {props.post.voteScore}</div>
)
Post.PropTypes = {
  post: PropTypes.object.isRequired
}

export default Post
