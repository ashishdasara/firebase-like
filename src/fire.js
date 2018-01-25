import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyA9DbZ_GB0pZsuIBLWqT0LED-TsvZq5_Lo",
  authDomain: "miniblog-f4a40.firebaseapp.com",
  databaseURL: "https://miniblog-f4a40.firebaseio.com",
  projectId: "miniblog-f4a40",
  storageBucket: "miniblog-f4a40.appspot.com",
  messagingSenderId: "753170408276"
};

var fire = firebase.initializeApp(config);
export default fire;
