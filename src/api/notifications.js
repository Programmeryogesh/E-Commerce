import axios from "axios";
import config from "../config";

const GetNotifications = async (userId) => {
  console.log(userId, "userId");
  try {
    const response = await axios.get(
      `${config.baseUrl}/auth/notifications`,
      { params: { id: userId } }
    );
    console.log(response, "response");
    return response;
  } catch (error) {
    return error.response;
  }
};

// Delete single notification
const deleteNotification = async (userId, notificationIndex) => {
  try {
    const response = await axios.delete(
      `${config.baseUrl}/auth/notifications`,
      { 
        params: { 
          userId: userId,
          notificationIndex: notificationIndex 
        } 
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// Delete all notifications
const deleteAllNotifications = async (userId) => {
  try {
    const response = await axios.delete(
      `${config.baseUrl}/auth/notifications/all`,
      { 
        params: { 
          userId: userId
        } 
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// Create/send a notification
const sendNotification = async (userId, message) => {
  try {
    const response = await axios.post(
      `${config.baseUrl}/auth/notifications`,
      { userId, message }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export default GetNotifications;
export { deleteNotification, deleteAllNotifications, sendNotification };
