/* eslint-disable no-undef */
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyBf4WdbsKOUvn_wrQs9eZ1HlfLx9qyH1Kw',
  authDomain: 'batiyalo-e6931.firebaseapp.com',
  projectId: 'batiyalo-e6931',
  storageBucket: 'batiyalo-e6931.appspot.com',
  messagingSenderId: '502599654045',
  appId: '1:502599654045:web:371daafb400a01ecd09274',
});
firebase.messaging();

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
