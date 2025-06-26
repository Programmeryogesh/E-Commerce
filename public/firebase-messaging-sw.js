importScripts("https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js");

// Initialize Firebase in Service Worker
const firebaseConfig = {
    apiKey: "AIzaSyBVjF935I4tNIzh9RU4TJitvcL69bUW77w",
    authDomain: "e-commerce-6dcc4.firebaseapp.com",
    projectId: "e-commerce-6dcc4",
    storageBucket: "e-commerce-6dcc4.appspot.com",
    messagingSenderId: "75862693280",
    appId: "1:75862693280:web:5c201858a157186ec140c5",
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle Background Notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Background Message:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  });
});
