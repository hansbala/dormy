import { firebaseAuth } from '../environment/config.js'
import { firebaseDB } from '../environment/config.js';

// Gets all users in database.
// If it exists, it returns a list of users, otherwise it calls the failCallback
export async function getUsers(uid) {
    let users = [];
    let usersRef = await firebaseDB.collection('users').get()
        .catch((err) => {
            console.log(err);
        });
    usersRef.forEach(doc => {
        const user = doc.data()
        if (user.roommateStatus) { // Only add if the user is opted into the roommate search
            if (user.userUID != uid) {
                user.id = doc.id;
                handleDefaults(user);
                user.realName = user.realName.split(" ")[0];
                users.push(user);
            }
        }
    })
    return users;
}

function handleDefaults(user) {
    // Default image in the case there is no profile picture
    // Although this should be handled in profile page
    if (!user.image) {
        user.image = "https://firebasestorage.googleapis.com/v0/b/dormy-94adf.appspot.com/o/roommate%2Fman.jpg?alt=media&token=919f832c-bfff-4eaa-a246-edfbe3867586";
    }
    if (!user.budget) {
        user.budget = "-";
    }
    if (!user.location) {
        user.location = "-";
    }
    return user;
}

// Adds the roommate-related fields to a user's profile
export async function addRoommateProfile(uid, roommateData) {
    const usersRef = firebaseDB.collection('users');

    await usersRef.doc(uid).update({
        budget: roommateData.budget,
        bio: roommateData.bio,
        preferredLocation: roommateData.location,
        lifestyleHabits: roommateData.lifestyleHabits,
        roommateStatus: true,
        // moveInDate: roommateData.moveInDate,
        // durationOfStay: roommateData.durationOfStay,
    });
}
