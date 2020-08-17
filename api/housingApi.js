// All housing related API calls go in here
import * as firebase from 'firebase/app';
import { firebaseDB } from "../environment/config.js";
import { uploadImagesToFirebase } from './imageApi.js';
import { getCurrentUID } from './userAuth.js';

// Downloads all housing listings from the firestore database
// Then passes in the data downloaded into a callback function
// provided as an argument
export async function getHousingListings() {
    let housingList = [];
    let snapshot = await firebaseDB.collection('housing').get()
    snapshot.forEach(async (doc) => {
        const houseItem = doc.data();
        houseItem.id = doc.id;
        if (!houseItem.images) {
            // If user uploaded image path is undefined
            houseItem.images = ['https://picsum.photos/600/400?key=' + Math.floor(Math.random() * 1000), 'test'];
        }
        housingList.push(houseItem);
    });
    // console.log(housingList);
    return housingList;
}

/**
 * Gets a housing listing based on the listing ID
 * @params {String} id the id of the listing
 * @return {JSON} The housing object
 */
export async function getHousingListingFromID(id) {
    let docRef = firebaseDB.collection('housing').doc(id);
    let houseItem;
    await docRef.get().then((doc) => {
        if (doc.exists) {
            houseItem = doc.data();
            houseItem.id = doc.id;
            // Again, if the housing image data is undefined, 
            // put in a placeholder image
            if (!houseItem.images) {
                houseItem.images = ['https://picsum.photos/600/400?key=' + Math.floor(Math.random() * 1000), 'test'];
            }
        } else {
            houseItem = null;
        }
    }).catch((error) => {
        console.log(error);
    });
    // Return the constructed housing listing
    return houseItem;
}

/**
 * Adds a housing data object to the firestore database
 * If it fails at any point it calls the failCallback function
 * passing in a string as to why it failed
 */
export async function postListing(housingData, failCallback, successCallback) {
    const housingDB = firebaseDB.collection('housing');
    const images = housingData.housingImages;
    const imagesRef = await uploadImagesToFirebase(images, '/housing/');
    housingData.images = imagesRef;
    console.log(housingData.images);
    housingDB.add(housingData).then((docRef) => {
        console.log("document written to database with reference: " + docRef)
        successCallback();
    })
        .catch((err) => {
            console.log('error writing document', err);
            failCallback();
        });
}

/**
 * When called, saves the housing listing under the user's saved housing listings
 * On success, calls successCallback, otherwise failCallback
 * @param {String} housingID The unique ID identifying a housing document
 * @param {function} successCallback 
 * @param {function} failCallback 
 */
export async function bookmarkHousingListing(housingID, successCallback, failCallback) {
    // Get the user UID
    const uid = getCurrentUID();
    let userRef = firebaseDB.collection('users').doc(uid);
    await userRef.update({
        savedHousingListings: firebase.firestore.FieldValue.arrayUnion(housingID)
    }).then(() => {
        // Document successfully updated with new listing in savedHousingListings
        successCallback();
    }).catch((error) => {
        // Could not find the doc. What the actual fuck???!!!
        console.log(error);
        failCallback();
    })
}

/**
 * When called, unsaves the housing listing under the user's saved housing listings
 * On success, calls successCallback, otherwise failCallback
 * @param {String} housingID The unique ID identifying a housing document
 * @param {function} successCallback 
 * @param {function} failCallback 
 */
export async function debookmarkHousingListing(housingID, successCallback, failCallback) {
    // Get the user UID
    const uid = getCurrentUID();
    let userRef = firebaseDB.collection('users').doc(uid);
    await userRef.update({
        savedHousingListings: firebase.firestore.FieldValue.arrayRemove(housingID)
    }).then(() => {
        // Document successfully updated with new listing in savedHousingListings
        successCallback();
    }).catch(() => {
        // Could not find the doc. What the actual fuck???!!!
        failCallback();
    })
}

/**
 * Returns a list of housing post id's that the user has bookmarked
 */
export async function getBookmarksHousing() {
    const uid = getCurrentUID();
    return new Promise((resolve, reject) => {
        firebaseDB.collection('users').doc(uid).get().then((doc) => {
            if (doc.exists) {
                const bookmarks = doc.data().savedHousingListings;
                resolve(bookmarks);
            } else {
                reject('Failed to get document');
            }
        }).catch((error) => {
            reject(error);
        })
    });
    // let userRef = firebaseDB.collection('users').doc(uid);
    // await userRef.get().then((doc) => {
    //     if (doc.exists) {
    //         const bookmarks = doc.data().savedHousingListings;
    //         console.log(bookmarks);
    //         return bookmarks;
    //     } else {

    //     }
    // }).catch((error) => {
    //     console.log('error getting document');
    // })
}