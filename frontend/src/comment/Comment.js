import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

const Comment = props => (
  <div>{props.comment.body} - {props.comment.author} - {props.comment.voteScore}</div>
)
Comment.PropTypes = {
  comment: PropTypes.object.isRequired,
}

export default Comment
