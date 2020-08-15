import { firebaseAuth } from '../environment/config.js'
import { firebaseDB } from '../environment/config.js';

// Create the user, and also add the user's name to the "users" collection
// Once everything is done, call the callback function
// If there is a failure, call the failCallback function
export function createUserAccount(email, password, successCallback, failCallback) {
    const approved_schools = ["brown.edu", "risd.edu"];
    email = email.trim().toLowerCase();
    if (email === "" || password === "") {
        failCallback('Invalid form data');
        return;
    }
    for (let school of approved_schools) {
        if (email.endsWith(school)) {
            firebaseAuth.createUserWithEmailAndPassword(email, password).then(() => {
                successCallback();
            }).catch((err) => {
                failCallback(err);
            });
            return;
        }
    }
    failCallback('A .edu address is required to use Dormy!');
}

/**
 * Sends an email verification link to the user's email provided
 */
export async function verifyUserEmail(successCallback, failureCallback) {
    let user = firebaseAuth.currentUser;
    await user.sendEmailVerification().then(() => {
        // Email has been sent successfully
        successCallback('verification sent');
    }).catch((err) => {
        failureCallback();
    });
}

/** 
 * Given an email and password, adds the user information to the 
 * FireStore database, do that it can be used later
 */
export async function addUserToCollection(email, realName, successCallback, failureCallback) {
    // Successfully created account so create an entry in users collection 
    // with the id of the user UID and add some fields to it like realName
    const localUserUID = firebaseAuth.currentUser.uid;
    const localEmail = firebaseAuth.currentUser.email;
    const usersRef = firebaseDB.collection('users');
    usersRef.doc(localUserUID).set({
        userUID: localUserUID,
        realName: realName,
        email: localEmail,
    })
    .then(() => {
        // name has also been added to the database, so we can call the successcallback
        successCallback('verification sent');
    })
    .catch((err) => {
        failCallback();
    });
}

/** 
 * Given an email and password, logs the user in 
 * only if the email provided has been verified
 * If successful, calls the successCallback otherwise
 * calls failureCallback, passing in an optional error message
 */
export function loginUser(email, password, successCallback, failureCallback) {
    firebaseAuth.signInWithEmailAndPassword(email, password).then(() => {
        // Successfully logged the user in
        if (firebaseAuth.currentUser.emailVerified) {
            successCallback();
        } else {
            failureCallback('Email has not been verified', 'verification');
        }
    }).catch(error => {
        failureCallback(error);
    });
}


// Gets a username from a UID of a user.
// If it exists, it returns the real name, otherwise it calls the failCallback
export async function getUserNameFromUID(uid, failCallback) {
    const usersRef = firebaseDB.collection('users');
    let realName = '';
    await usersRef.doc(uid).get().then((doc) => {
        if (doc.exists) {
            realName =  doc.data().realName;
        } else {
            failCallback();
        }
    }).catch((err) => {
        failCallback();
    });
    return realName;
}

// Get the current UID of the user that has been logged in
export function getCurrentUID() {
    if (firebaseAuth.currentUser.uid != null || firebaseAuth.currentUser.uid !== "") {
        return firebaseAuth.currentUser.uid;
    } else {
        console.log('current user does not have a UID.. what the fuck!');
        return '';
    }
}
