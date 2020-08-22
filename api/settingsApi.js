import { firebaseAuth } from '../environment/config.js'
import { firebaseDB } from '../environment/config.js';


// Gets a user data
// If it exists, it returns the users data, otherwise it calls the failCallback
export async function getUserData(uid, failCallback) {
    const usersRef = firebaseDB.collection('users');
    let realName = '';
    await usersRef.doc(uid).get().then((doc) => {
        if (doc.exists) {
            realName = doc.data()
        } else {
            failCallback();
        }
    }).catch((err) => {
        console.log(err);
        failCallback();
    });
    return realName;
}

//Updates a users setting
export function updateUserData(uid, update) {
    const usersRef = firebaseDB.collection('users');
    // const rideshareRef = firebaseDB.collection('rideshare');
    usersRef.doc(uid).update({username: update, realName: update});
    // rideshareRef.doc(uid).whereField("userUID", isEqualTo: String(describing: Auth.auth().currentUser!.uid)))
}

  