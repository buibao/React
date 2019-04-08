import firebase from 'firebase';
import 'firebase/firebase-firestore';

const config = {
    apiKey: "AIzaSyAzzZury9H8NgvP3VJHB6H30oLrt7fqONc",
    authDomain: "trainning-9d9cc.firebaseapp.com",
    databaseURL: "https://trainning-9d9cc.firebaseio.com",
    projectId: "trainning-9d9cc",
    storageBucket: "trainning-9d9cc.appspot.com",
    messagingSenderId: "546583286032"
  };
  firebase.initializeApp(config);
  firebase.firestore();
  export default firebase;

