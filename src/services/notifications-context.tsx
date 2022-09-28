import React from "react";

type Notification = {
  title: string
  body: string
};

const defaultApi = {
  notifications: [] as Notification[],
  addNotification: (title: string, body: string) => null,
  removeNotification: (index: number) => null
};

export type NotificationsContextValue = typeof defaultApi;

export const NotificationsContext = React.createContext<NotificationsContextValue>(defaultApi);

export function NotificationsProvider({ children }: any) {
  // Notifications queue is managed in local useState
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  const removeNotification = (index: number) => {
    setNotifications(notifications.filter((n, i) => {
      return i !== index
    }));
    return null;
  };
  
  const addNotification = (title: string, body: string) => {
    setNotifications([...notifications, {title, body}]);
    return null;
  };
  
  // Return Provider with full API
  const api = { notifications, addNotification, removeNotification };
  return (
    <NotificationsContext.Provider value={api}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return React.useContext(NotificationsContext);
}
