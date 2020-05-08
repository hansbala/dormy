import { firebaseAuth } from '../environment/config.js'
import { firebaseDB } from '../environment/config.js';

// Gets a user contact
// If it exists, it returns a list of contact, otherwise it calls the failCallback
export async function getUserContacts(uid, failCallback) {
    const usersRef = firebaseDB.collection('users');
    let contacts = [];
    await usersRef.doc(uid).get().then((doc) => {
        if (doc.exists) {
            contacts =  doc.data().contacts;
        } else {
            failCallback();
        }
    }).catch((err) => {
        console.log(err);
        failCallback();
    });
    return contacts;
}
