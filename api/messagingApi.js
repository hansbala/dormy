/**
 * All messaging related API content goes in here
 * Typically, this includes the following:
 * (1) Getting messages associated with a user-user inbox
 * (2) Posting a message to the Firestore user-user inbox
 *
 * The way the user inbox document name is constructed is
 * illustrated through the following example:
 * John Doe (UID: aaaaaaa)
 * Alice Bacon (UID: bbbbbbb)
 * Inbox document name associated with (John/Alice): aaaaaaabbbbbbb
 * In other words, inbox name = min(UID(John), UID(Alice)) + UID' (complement)
 * It should be noted that each inbox is a collection. So, for the above,
 * the collection path would be ('chatrooms/aaaaaaabbbbbbb/{..Individual chat dox..}')
 * So each chat message would essentially be a document under the collection
 * 
 * This will optimize query times over FireStore and also be scalable.
 * We will also be able to do things like retrieve only the 10 most recent chat
 * dox from a collection (inbox) and will support lazy loading of chat messages.
 */

import * as firebase from "firebase/app";
import { firebaseAuth, firebaseDB, firebaseStore } from "../environment/config.js";

/**
 * Returns the inbox collection name given a chat between 2 persons
 * @param {String} uid1 The first UID
 * @param {String} uid2 The second UID
 */
export function getInboxEndpoint(uid1, uid2) {
    let res;
    if (uid1 < uid2) {
        res = uid1 + uid2;
    } else {
        res = uid2 + uid1;
    }
    return res;
}

/**
 * Important documentation: https://www.youtube.com/watch?v=BwX92kKIpRY
 * Posts a message to the respective firestore inbox.
 * Returns a promise which can be either (then() or catch())'d;
 * @param {String} messageText The text of the message to be sent
 * @param {Reference/String} messageAttachment Reference to the Firestore
 *                          storage if the message includes an attachment
 * @param {String} author UID of the author (sender)
 * @param {String} recipient UID of the recipient of the message
 */
export function postMessage(messageText, messageAttachment, author, recipient) {
    // Create the message document (timestamp is logged when the message
    // reaches the server)
    let message = {
        messageText: messageText,
        messageAttachment: messageAttachment,
        author: author,
        recipient: recipient,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        deliveredFlag: false,
        readFlag: false,
    };
    let inboxEndpoint = getInboxEndpoint(author, recipient);

    // Write the UID of the recipient to the author's (contacts) array field
    // This is in the form of a promise
    let authorContactPromise = firebaseDB.collection('users').doc(author).update({
        contacts: firebase.firestore.FieldValue.arrayUnion(recipient)
    });

    // Write the UID of the author to the recipient's (contacts) array field
    // This is in the form of a promise
    let recipientContactPromise = firebaseDB.collection('users').doc(recipient).update({
        contacts: firebase.firestore.FieldValue.arrayUnion(author)
    });

    // Write the actual message to the inbox in the form of a promise
    // TODO: Alternate document and sub-collection
    let messagePromise = firebaseDB.collection('chatrooms/' + inboxEndpoint).add(message);

    // Chain the promises in order 
    // (Write recipient contact to author) -> (Write author contact to recipient)
    // -> (Write message to respective inbox)
    return authorContactPromise.then(() => {
        console.log('wrote recipient contact to: ' + author);
        return recipientContactPromise;
    }).then(() => {
        console.log('wrote author contact to: ' + recipient);
        return messagePromise;
    }).catch((err) => {
        console.log('failed to write contacts to specific users');
        reject(err);
    });
}

/**
 * Returns an object like the following:
 * {
 *     paginationObj: <document Reference>
 *     messages: [{...}, {...}, {...}, ...., {...}]
 * }
 * In retrieving messages, we use query pagination to help 
 * process loading previous messages in batches.
 * Documentation here: https://tinyurl.com/y53nzwvw
 * Ideally, if an inbox has ~~->1000 messages, retrieving all messages
 * would be a waste of document reads. We only read in batches when the user
 * scrolls through the message list, and also consumes less data
 * @param {String} uid1 UID of person 1
 * @param {String} uid2 UID of person 2
 * @param {Number} numMessages Number of recent messages to return (Default: 50)
 * @param {Object} paginationObj the pagination object returned by this very same 
 * function if it has been called before. If this is the first time this is being
 * called, this would be null.
 */
export async function getRecentMessages(uid1, uid2, numMessages = 50, paginationObj = null) {
    // TODO: Query pagination for larger message inboxes
    let messages = [];
    let inboxEndpoint = getInboxEndpoint(uid1, uid2);

    // Get last (numMessages) sorted by timestamp and then return a promise to the caller
    return new Promise((resolve, reject) => {
        firebaseDB.collection('chatrooms/').doc('endpoints').collection(inboxEndpoint)
            .orderBy("timestamp", "desc").limit(numMessages).get().then((querySnapshot) => {
                querySnapshot.forEach((msgDoc) => {
                    // Resolve each messages data into an object and append it to the messages array
                    messages.push(msgDoc.data());
                });
                resolve(messages);
            })
            .catch((err) => {
                reject(err);
            });
    });
}