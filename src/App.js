import React, { Component } from 'react';
import './App.css';
import fire from './fire';
import CreateComment from './CreateComment'
import FacebookProvider, { Share, Feed } from 'react-facebook';

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
  render() {
    return(
      <div className="container display_comment">
        <p>{this.props.comment.text}</p>
        <FacebookProvider appId="334164410431105">
        <Share href="#" quote={this.props.comment.text}>
          <button type="button">Share</button>
        </Share>
      </FacebookProvider>
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
