import * as firebase from 'firebase'
  // Initialize Firebase
  let config = {
    apiKey: "AIzaSyBVRd_HaSy-RTHuBIgRWDN9Bf_xNT1DLuQ",
    authDomain: "lamyaechallenge.firebaseapp.com",
    databaseURL: "https://lamyaechallenge.firebaseio.com",
    projectId: "lamyaechallenge",
    storageBucket: "lamyaechallenge.appspot.com",
    messagingSenderId: "737038420875"
  }
  firebase.initializeApp(config)
let database = firebase.database()

