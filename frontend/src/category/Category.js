import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

const Category = props => (
      <div style={{padding: '10px', border:'1px solid black', cursor: 'pointer'}}>
			{props.categoryName}
	  </div>
)

Category.PropTypes = { categoryName: PropTypes.string.isRequired };

export default Category