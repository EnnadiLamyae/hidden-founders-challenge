import * as firebase from 'firebase'
  // Initialize Firebase
  let config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  }
  firebase.initializeApp(config)
let database = firebase.database()

