/** 
 * All image related functions are written in here
 * Since there are so many image related stuff that
 * needed to be taken care of, I figured a separate 
 * API was needed since both the housing, profile,
 * and possibly the rideShare stuff will use it
 */

import { firebaseStore } from '../environment/config.js';
import { uuidv4 } from './utils.js';

/**
 * Given an array of images, uploads them to firebase,
 * and returns an array of references to the images
 * uploaded which can be later referenced
 * @params {Array} array of image file uri's
 * @params {childLocation} string reference to the location
 *                          we wish to upload the images to
 * @return {Array} array of image references
 */
export async function uploadImagesToFirebase(alou, childLocation) {
    let aloir = [];
    for (let i = 0; i < alou.length; i++) {
        let currImageRef = await uploadImageToFirebase(alou[i], childLocation);
        aloir.push(currImageRef);
    }
    return aloir;
}

/** 
 * Given a local image URI, uploads it to firebase,
 * and returns a downloadUrl to the image uploaded
 */
export async function uploadImageToFirebase(uri, childLocation) {
    uriToBlob(uri).then((blob) => {
        return uploadBlobToFirebase(blob, childLocation);
    }).then((snapshot) => {
        console.log('image uploaded');
        return snapshot.ref.getDownloadUrl();
    }).then((downloadUrl) => {
        console.log('Download URL: ' + downloadUrl);
        return downloadUrl;
    }).catch((error) => {
        console.log(error);
    });
}

/** 
 * Given a URI, returns a BLOB (Binary Large OBject)
 * which firebase needs to process the image upload
 * Note that this returns a promise
 */
async function uriToBlob(uri) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onload = function() {
            // return the blob
            resolve(xhr.response);
        };

        xhr.onerror = function() {
            // something went wrong
            reject(new Error('uriToBlob failed'));
        };

        // this helps us get a blob
        xhr.responseType = 'blob';

        xhr.open('GET', uri, true);
        xhr.send(null);
    });
}

/** 
 * Given a BLOB, returns a promise that we can
 * monitor using .then() to see the upload progress
 * to firebase
 */
// TODO: Handle filename extensions
async function uploadBlobToFirebase(blob, childLocation) {
    const uid = uuidv4();

    return new Promise((resolve, reject) => {

        let storageRef = firebaseStore;

        storageRef.child(childLocation + '' + uid + '.jpg').put(blob, {
            contentType: 'image/jpeg'
        }).then((snapshot) => {
            blob.close(); // let's free up the blob
            resolve(snapshot);
        }).catch((error)=>{
            reject(error);
        });
    });
}
