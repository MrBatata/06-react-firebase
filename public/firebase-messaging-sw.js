// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging-compat.js');
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDdTFc5fQGXMEUvmzfu3WvCEoTDSDyV9Lg",
  authDomain: "react-firebase-f3ec8.firebaseapp.com", // ? Use this line for the Firebase Authentication emulator 
  // authDomain: "localhost", // ? Use this line for the Firebase Authentication emulator
  projectId: "react-firebase-f3ec8",
  storageBucket: "react-firebase-f3ec8.appspot.com",
  messagingSenderId: "825973019058",
  appId: "1:825973019058:web:dcd3b37b0abf5ba50454ab",
  measurementId: "G-810SGT521E",

  // ? Add for Firebase Emulator, comment for server use
  // TODO: comment if not using emulator
  // databaseURL: "http://localhost:8080", // Use the Firestore emulator URL
  // emulatorHost: "localhost",
  // emulatorPort: 8080,
  // ? Add the following to use the Firebase Authentication emulator
  // apiKey: "my-api-key",
  // authDomain: "localhost",
  // projectId: "my-project",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically
// and you should use data messages for custom notifications.
// For more info see:
// https://firebase.google.com/docs/cloud-messaging/concept-options

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Mensaje de Mr Batata';
  const notificationOptions = {
    body: 'Buenos días!',
    icon: '/firebase-logo.png'
  };
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});