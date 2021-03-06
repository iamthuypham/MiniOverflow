import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCategories } from '../category/action';

const uuidv4 = require('uuid/v4');

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      	title: '',
      	body: '',
      	author: '',
      	category: this.props.category
    })
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault();
    const newPost = {
      	id: uuidv4(),
    	title: this.state.title,
      	category: this.state.category,
      	body: this.state.body,
      	author: this.state.author,
      	timestamp: Date.now(),
      voteScore: 1,
      deleted: false
    }
    this.props.onSubmitRequest(newPost)
  }
  componentWillReceiveProps(nextProps) {
  	if (this.props.category !== nextProps.category) {
    	this.setState({
            title: '',
            body: '',
            author: '',
        	category: nextProps.category
        })
    }
  }
  componentDidMount() {    
    this.props.dispatchFetchCategories()
  }
  render() {
    const { categories } = this.props.categories
    const { title, author, body, category } = this.state
    return (
  	  <div>
          <form onSubmit={this.handleSubmit}>
               <input type="text" name="title" placeholder="New Title" value={title} onChange={(e) => this.setState({ title: e.target.value })} required/>
			   <label>
                  Current category:
                  <select value={category} onChange={(e) => this.setState({ category: e.target.value })}>
					<option value=''>Select a category</option>
					{categories && categories.map((category) => 
                    	<option key={category.name} value={`${category.name}`}>{category.name}</option>
                    )}
                  </select>
                </label>
               <input type="text" name="body" placeholder="New Content" value={body} onChange={(e) => this.setState({ body: e.target.value })} required/>
               <input type="text" name="author" placeholder="Your Name" value={author} onChange={(e) => this.setState({ author: e.target.value })} required/>
               <input type='submit' value='Submit'/>
          </form>
      </div>
	)
  }
}

function mapStateToProps (state, ownProps) {
  const { categories } = state.CategoryReducer.getAllCategories
  return { categories }
}

const mapDispatchToProps = (dispatch) => ({
  	dispatchFetchCategories: () => dispatch(fetchCategories()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);
