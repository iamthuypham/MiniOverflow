import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

const Category = props => (
  <Link to={`/${props.categoryPath}/posts`}>{props.categoryName}</Link>
)
Category.PropTypes = { 
  categoryPath: PropTypes.string.isRequired, 
  categoryName: PropTypes.string.isRequired
}

export default Category
