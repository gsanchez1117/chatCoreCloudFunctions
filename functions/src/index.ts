import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

//initialise the app for admin use
admin.initializeApp();

//get an instance of the firestore database
const db = admin.firestore();

//Help: https://bigcodenerd.org/create-user-profile-firestore-authentication/

/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 * @param {Object} context Details about the event.
 */
const createProfile = (userRecord, context) => {
    return db.collection('Users').doc(userRecord.uid).set({
      displayName: 'Anonymous',
      email: userRecord.email,
    }).catch(console.error);
  };

/**
 * functions to deploy
 */
module.exports = {
    //create a user profile when a new user is created
    authOnCreate: functions.auth.user().onCreate(createProfile),
};