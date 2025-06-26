// Utility for notification refresh events
export const NOTIFICATION_REFRESH_EVENT = 'notification-refresh';

export const triggerNotificationRefresh = () => {
  // Dispatch a custom event to notify components to refresh notifications
  window.dispatchEvent(new CustomEvent(NOTIFICATION_REFRESH_EVENT));
};

export const listenToNotificationRefresh = (callback) => {
  const handleRefresh = () => {
    callback();
  };
  
  window.addEventListener(NOTIFICATION_REFRESH_EVENT, handleRefresh);
  
  // Return cleanup function
  return () => {
    window.removeEventListener(NOTIFICATION_REFRESH_EVENT, handleRefresh);
  };
}; 