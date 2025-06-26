import axios from "axios";
import { sendNotification } from "./notifications";

const getProfile = async (userId) => {
  try {
    const response = await axios.get("http://localhost:5000/api/auth/profile", {
      params: { userId },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

const uploadProfilePhoto = async (userId, file) => {
  try {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('photo', file);
    const response = await axios.post("http://localhost:5000/api/auth/profile-photo", formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    
    return response;
  } catch (error) {
    return error.response;
  }
};

export default getProfile;
export { uploadProfilePhoto }; 