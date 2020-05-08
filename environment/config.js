// Configuration for firebase authentication

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCmFquw7_VdjL9_n6esA8dVbLxaJDmMsLE",
    authDomain: "dormy-94adf.firebaseapp.com",
    // databaseURL: "https://dormy-94adf.firebaseio.com",
    projectId: "dormy-94adf",
    storageBucket: "dormy-94adf.appspot.com",
    messagingSenderId: "1008613822753",
    appId: "1:1008613822753:web:a7b9f8019cf62314062e60",
    measurementId: "G-CE2ZKCSTFH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// console.log(firebase);

// Export the firebase authentication as a custom object
export const firebaseAuth = firebase.auth();
export const firebaseDB = firebase.firestore();
// Reference to the firebase store
export const firebaseStore = firebase.storage().ref();