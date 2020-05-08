import { firebaseAuth } from '../environment/config.js'
import { firebaseDB } from '../environment/config.js';

// Gets all users in database.
// If it exists, it returns a list of users, otherwise it calls the failCallback
export async function getUsers() {
    const usersRef = firebaseDB.collection('users');
    let users = [];
    await usersRef.get().then(snapshot => {
        snapshot.forEach(doc => {
            const user = doc.data()
            user.id = doc.id;
            users.push(user);
        })
    }).catch((err) => {
        console.log(err);
    });
    return users;
}
