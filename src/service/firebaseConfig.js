import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBVjF935I4tNIzh9RU4TJitvcL69bUW77w",
  authDomain: "e-commerce-6dcc4.firebaseapp.com",
  projectId: "e-commerce-6dcc4",
  storageBucket: "e-commerce-6dcc4.appspot.com",
  messagingSenderId: "75862693280",
  appId: "1:75862693280:web:5c201858a157186ec140c5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 🔹 Request Notification Permission & Get Token
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BJtRe5cUGtfOIpWJey8pCGlByaMsGaPIQ7Ryq7kBxYpA5A-ujuUA8tU9wGypygX_nLVmBfAmSbEwEnJD08G1xP8",
      });
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("Permission denied");
    }
  } catch (error) {
    console.error("Error getting FCM token", error);
  }
};

export const getFCMToken = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging, {
          vapidKey: 'BJtRe5cUGtfOIpWJey8pCGlByaMsGaPIQ7Ryq7kBxYpA5A-ujuUA8tU9wGypygX_nLVmBfAmSbEwEnJD08G1xP8', // Your VAPID key here
        });
        console.log('FCM Token:', token);
        return token;
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

// 🔹 Listen for Incoming Messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("New Notification:", payload);
      alert(`🔔 ${payload.notification.title}: ${payload.notification.body}`);
      resolve(payload);
    });
  });

export { messaging };
