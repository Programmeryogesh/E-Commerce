// src/components/NotificationService.js
import { getFCMToken } from '../service/firebaseConfig'; // Import FCM logic
import config from "../config";
const updateFcmToken = async (userId, fcmToken) => {
  try {
    const response = await fetch(`${config.baseUrl}/auth/update-fcm-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,  // The user's ID from your auth system
        fcmToken: fcmToken,  // The FCM token you've just received
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log('FCM token updated:', data);
    } else {
      console.error('Error updating FCM token:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Example usage in a component where user logs in or session is active
const handleFCMTokenUpdate = async (userId) => {
  const fcmToken = await getFCMToken();
  if (fcmToken) {
    await updateFcmToken(userId, fcmToken); // Send FCM token to backend
  }
};

export { updateFcmToken, handleFCMTokenUpdate };
