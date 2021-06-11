require('dotenv').config();
const { apiKey, authDomain, databaseURL,
    projectId, storageBucket, messagingSenderId, appId,
    measurementId } = process.env

const firebaseConfig = {
    apiKey, authDomain, databaseURL, projectId,
    storageBucket, messagingSenderId, appId,
    measurementId
}

const firebase = require('firebase').default;
firebase.initializeApp(firebaseConfig);
const { auth, firestore, storage } = firebase;

module.exports = { auth, firestore, storage }