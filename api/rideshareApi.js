// All Rideshare related API calls go in here
import { firebaseAuth, firebaseDB, firebaseStore } from "../environment/config.js";
// Downloads all housing listings from the firestore database
// Then passes in the data downloaded into a callback function
// provided as an argument
export async function getRideshares() {
    let rideshareList = [];
    let snapshot = await firebaseDB.collection('rideshare').get()
    snapshot.forEach(async (doc) => {
        const rideItem = doc.data();
        rideItem.id = doc.id;
        rideshareList.push(rideItem);
    });
    return rideshareList;
}

// Adds a housing data object to the firestore database
// If it fails at any point it calls the failCallback function
// passing in a string as to why it failed
export async function postRideshare(rideshareData, failCallback, successCallback) {
    const rideshareDB = firebaseDB.collection('rideshare');
    rideshareDB.add(rideshareData).then((docRef) => {
        console.log("document written to database with reference: " + docRef)
        successCallback();
    })
    .catch((err) => {
        console.log('error writing document', err);
    });
}
