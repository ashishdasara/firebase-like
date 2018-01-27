import React, { Component } from 'react';
import './App.css';
import fire from './fire';
import CreateComment from './CreateComment'
import FacebookProvider, { Share as FbShare} from 'react-facebook';

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
    this.createLink = this.createLink.bind(this);
  }

  componentWillMount() {
    let newComment = this.props.comment;
    this.setState({comment: newComment});
  }
  hitLike(e) {
    e.preventDefault();
    let currentComment=this.state.comment;
    currentComment.properties.likes+=1;
    this.setState({comment: currentComment});
    this.firebaseRef = fire.database().ref("comments");
    this.firebaseRef.child(this.state.comment.id).set(this.state.comment
    );
  }
  createLink = (text) => {
    text=text.split(' ');
    var str=text.join('%20');
    var linkStr= "https://twitter.com/intent/tweet?text="+str+"&tw_p=tweetbutton";
    return linkStr;
  }

  render() {
    return(
      <div className="container display_comment">
        <p>{this.state.comment.text}</p>
        <div className="buttons">
          <span>{this.state.comment.properties.likes} people like this </span>
          <button onClick={this.hitLike}>
            <span className="glyphicon glyphicon-thumbs-up"></span>
          </button>
          <FacebookProvider appId="334164410431105">
            <FbShare quote={this.state.comment.text}>
                <a className="btn">
                  <i className="fa fa-facebook"></i>
                </a>
            </FbShare>
          </FacebookProvider>


          <a target="_blank" className="btn" href={this.createLink(this.state.comment.text)}>
            <i className="fa fa-twitter"></i>
          </a>
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
