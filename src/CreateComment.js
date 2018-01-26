import React from 'react'
import fire from './fire';

class CreateComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: {
        text: "",
        id: 0,
        properties: {
          likes: 0,
          shares: 0
        }
      }
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.titleCase = this.titleCase.bind(this);

  }
  componentWillReceiveProps(nextProps) {
    this.forceUpdate();
    var length= this.props.comments.length;
    var newComment=this.state.comment;
    newComment.id = length;
    this.setState({comment: newComment});
  }

  handleClick=(e)=> {

    e.preventDefault();
    this.firebaseRef = fire.database().ref("comments");
    this.firebaseRef.child(this.state.comment.id).set(this.state.comment
    );
    var newComment=this.state.comment;
    newComment.text = "";
    this.setState({comment: newComment});
  }

  titleCase(str) {
    str=str.split('');
    str[0]=str[0].toUpperCase();
    return str.join('');
  }

  handleTextChange = (e) => {
    var newComment=this.state.comment;
    var text = this.titleCase(e.target.value);
    newComment.text = text;
    this.setState({comment: newComment});
  }
  render() {
    return(
        <div className="create_comment">
          <div className="container header_box">
            <h1>MiniBlog</h1>
          </div>
          <div className="container form_area">
            <textarea value={this.state.comment.text} initial-value={this.state.comment.text} onChange={this.handleTextChange} placeholder="What's on your mind?"></textarea>
            <button onClick={this.handleClick}>Post</button>
          </div>
        </div>
    )
  }
}

export default CreateComment
