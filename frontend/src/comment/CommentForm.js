import React, { Component } from 'react';
import { connect } from 'react-redux';

const uuidv4 = require('uuid/v4');

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = ({
        author:'',
        body:'',
        deleted:false,
        parentDeleted:false,
        voteScore:0
    })
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault();
    const newComment = {
      	id: uuidv4(),
    	  author:this.state.author,
        body:this.state.body,
        deleted:this.state.deleted,
        parentId: this.props.post.id,
        parentDeleted:this.state.deleted,
        voteScore:this.state.voteScore,
      	timestamp: Date.now(),
    }
    this.props.onSubmitRequest(newComment)
  }
  
  handleChange(e){
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  
  componentWillReceiveProps(nextProps) {
  	if (this.props.comments != nextProps.comments){
  	  this.setState({
        author:'',
        body:''
  	  })
  	}
  }
  componentDidMount() {    
  }
  render() {
    const { author, body } = this.state
    return (
  	  <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="body" placeholder="New Comment" value={body} onChange={this.handleChange} required/>
            <input type="text" name="author" placeholder="Your Name" value={author} onChange={this.handleChange} required/>
            <input type='submit' value='Submit'/>
          </form>
      </div>
	)
  }
}

export default CommentForm;
