import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Category = props => (
  <Link to={`/${props.categoryPath}`}>{props.categoryName}</Link>
)
Category.PropTypes = { 
  categoryPath: PropTypes.string.isRequired, 
  categoryName: PropTypes.string.isRequired
}

export default Category
