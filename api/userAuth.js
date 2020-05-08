import { firebaseAuth } from '../environment/config.js'
import { firebaseDB } from '../environment/config.js';

// Create the user, and also add the user's name to the "users" collection
// Once everything is done, call the callback function
// If there is a failure, call the failCallback function
export function createUserAccount(email, password, realName, successCallback, failCallback) {
    firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then(() => {
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
                successCallback();
            })
            .catch((err) => {
                console.log("failure in writing real name to database");
                failCallback();
            })
        })
        .catch((err) => {
            failCallback();
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
        console.log(err);
        failCallback();
    });
    // console.log(realName);
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