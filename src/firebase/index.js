// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getMessaging, getToken } from "firebase/messaging";
// https://firebase.google.com/docs/firestore/quickstart?authuser=0&hl=es
import { getFirestore } from "firebase/firestore";

/**
 * Firebase Cloud Messaging -> https://firebase.google.com/docs/cloud-messaging/js/client?hl=es-419
 * First, activate Cloud Messaging in Project Config -> https://console.firebase.google.com/project/react-firebase-f3ec8/settings/cloudmessaging/web:NzI0NGMyZTAtMWJiOS00OTVmLWE5NzctYjMzOGM2YmE0MzZl?hl=es
 * Second, generate "Key Pair" -> vapidKey
 * Third, import `getMessaging`
 * Fourth, initialize FCM (see below `const messaging = ...`)
 */
const vapidKey = "BPK9HnuF094NoINtjovWRabbaA4HP5kI6znxgROqk3LOMJzRP4trDmmfYYYdkE4RRM2EE1KlGtsDQhIQRWVjvKA";

// Your web app's Firebase configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyDdTFc5fQGXMEUvmzfu3WvCEoTDSDyV9Lg",
  authDomain: "react-firebase-f3ec8.firebaseapp.com",
  projectId: "react-firebase-f3ec8",
  storageBucket: "react-firebase-f3ec8.appspot.com",
  messagingSenderId: "825973019058",
  appId: "1:825973019058:web:dcd3b37b0abf5ba50454ab"
};

/**
 * Firebase Initialize 
 */
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging();
getToken(messaging, { vapidKey: vapidKey })
  // `currentToken` is automatically generated for each "client" that allows notifications
  // for our app.
  // We should save it on our database
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      // console.log(currentToken);
      // token must be stored in server...
      sendTokenToServer(currentToken);
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    };
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });

// Initial code to store tokens in db
const sendTokenToServer = token => {
  // if already in localStorage, just return
  // if (localStorage.getItem('tokenSentToServer')) {
  //   return localStorage.getItem('tokenSentToServer')
  // };
  // Same with less code..
  if (localStorage.getItem('tokenSentToServer')) return;
  // if true, returns... escaping from function and preventing .setItem() execution
  // TODO: code to store token in db
  localStorage.setItem('tokenSentToServer', '1')
};

/**
 * Cloud Firestore - data base - Initialize  and get a reference to the service
 */
export const db = getFirestore(app);