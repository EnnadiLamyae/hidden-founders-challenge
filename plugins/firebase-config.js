import * as firebase from 'firebase'
  // Initialize Firebase
  let config = {
    apiKey: "app-key",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  }
  firebase.initializeApp(config)
let database = firebase.database()

