import React, { Component } from 'react';
import './App.css';
import fire from './fire';
import CreateComment from './CreateComment'
import FacebookProvider, { Share, Feed, Like } from 'react-facebook';

class DisplayAll extends Component {
  constructor(props) {
    super(props);
    this.state= {
      comments: [],
      items: []
    }
  }
  componentWillMount() {
    this.setState({comments: this.props.comments});
  }
  render() {
    return (
      <div className="display_all">
        {this.state.comments.length!==0? this.state.comments.map(comment => {
            return(<DisplayComment key={comment.id} comment={comment}/>);
          }):null
        }
      </div>
    );
  }
}

class DisplayComment extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      comment: {
        text: "",
        id: 0,
        properties: {
          likes: 0,
          shares: 0
        }
      }
    };
    this.hitLike = this.hitLike.bind(this);
  }

  componentWillMount() {
    let newComment = this.props.comment;
    this.setState({comment: newComment});
  }
  //
  hitLike(e) {
    e.preventDefault();
    let currentComment=this.state.comment;
    currentComment.properties.likes+=1;
    this.setState({comment: currentComment});
    this.firebaseRef = fire.database().ref("comments");
    this.firebaseRef.child(this.state.comment.id).set(this.state.comment
    );
  }

  render() {
    return(

      <div className="container display_comment">
        <p>{this.state.comment.text}</p>
        <div>
          <span>{this.state.comment.properties.likes} people like this </span>
          <button onClick={this.hitLike}>
            <span className="glyphicon glyphicon-thumbs-up"></span>
          </button>
          <FacebookProvider appId="334164410431105">
            <Share quote={this.state.comment.text}>
              <button>
                <i className="fa fa-facebook"></i>
              </button>
            </Share>
          </FacebookProvider>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      comments: [],
      items: []
    }
  }

  componentWillMount() {
    let newComments=this.state.comments;
    this.firebaseRef = fire.database().ref("comments");
    this.firebaseRef.on("child_added", function(dataSnapshot) {
      newComments.push(dataSnapshot.val());
      this.setState({comments: newComments});
    }.bind(this));
    console.log(this.state.comments)
  }

  render() {
    return(
      <div className="container">
        <CreateComment comments={this.state.comments}/>
        <DisplayAll comments={this.state.comments}/>
      </div>
    )
  }
}

export default App;
