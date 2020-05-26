// All housing related API calls go in here
import { firebaseAuth, firebaseDB, firebaseStore } from "../environment/config.js";
import { uploadImagesToFirebase } from './imageApi.js';

// Downloads all housing listings from the firestore database
// Then passes in the data downloaded into a callback function
// provided as an argument
export async function getHousingListings() {
    let housingList = [];
    let snapshot = await firebaseDB.collection('housing').get()
    snapshot.forEach(async (doc) => {
        const houseItem = doc.data();
        houseItem.id = doc.id;
        // houseItem.imagePath = 'https://source.unsplash.com/collection/8578312/800x600' + '?key=' + Math.floor(Math.random() * 1000);
        houseItem.imagePath = 'https://picsum.photos/600/400?key=' + Math.floor(Math.random() * 1000);
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
        } else {
            houseItem = null;  
        }
    }).catch((error) => {
        console.log(error);
    });
    // Return the constructed housing listing
    return houseItem;
}

// Adds a housing data object to the firestore database
// If it fails at any point it calls the failCallback function
// passing in a string as to why it failed
export async function postListing(housingData, failCallback, successCallback) {
    const housingDB = firebaseDB.collection('housing');
    const images = housingData.housingImages;
    const imagesRef = await uploadImagesToFirebase(images, '/housing/');
    console.log(imagesRef);
    // housingData.images = imagesRef;
    // housingDB.add(housingData).then((docRef) => {
    //     console.log("document written to database with reference: " + docRef)
    //     successCallback();
    // })
    // .catch((err) => {
    //     console.log('error writing document', err);
    // });
}

// async function postImagesToStorage(imagesArray) {
//     console.log('running upload images');
//     let imagesRef = [];
//     for (let i = 0; i < imagesArray.length; i++) {
//         uriToBlob(imagesArray[i]).then(
//             (blob) => {
//                 return uploadImageToFirebase(blob, i);
//             }
//         ).then((snapshot) => {
//             console.log(snapshot);
//             snapshot.ref.getDownloadUrl().then(function(downloadUrl) {
//                 console.log(downloadUrl);
//                 imagesRef.push(downloadUrl);
//             })
//             console.log('file uploaded');
//         }).catch((error) => {
//             console.log(error);
//         });
//     }
//     console.log(imagesRef);
//     return imagesRef;
// }

// async function uploadImageToFirebase(blob, filename) {
//     return new Promise((resolve, reject) => {
  
//         firebaseStore.child('housing/' + filename + '.jpg').put(blob, {
//             contentType: 'image/jpeg'
//         }).then((snapshot)=>{
//             blob.close();
//             resolve(snapshot);
//         }).catch((error)=>{
//             reject(error);
//         });
//     });
// }

// async function uriToBlob(uri) {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();    
//         xhr.onload = function() {
//             // return the blob
//             resolve(xhr.response);
//         };
            
//         xhr.onerror = function() {
//             // something went wrong
//             reject(new Error('uriToBlob failed'));
//         };    // this helps us get a blob
//         xhr.responseType = 'blob';    
//         xhr.open('GET', uri, true);
        
//         xhr.send(null);
//     });
// }
