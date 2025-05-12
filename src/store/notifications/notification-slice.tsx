import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

type Notification = {
  id: string;
  body: ReactNode;
};

interface NotificationState {
  barList: Notification[];     // For the bar
  popupList: Notification[];   // For the popup
}

const initialState: NotificationState = {
  barList: [],
  popupList: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addBarNotification: (state, action: PayloadAction<Notification>) => {
      state.barList.push(action.payload);
    },
    removeBarNotification: (state, action: PayloadAction<string>) => {
      state.barList = state.barList.filter(n => n.id !== action.payload);
    },
    clearAllBarNotifications: (state) => {
      state.barList = [];
    },

    addPopupNotification: (state, action: PayloadAction<Notification>) => {
      state.popupList.push(action.payload);
    },
    removePopupNotification: (state, action: PayloadAction<string>) => {
      state.popupList = state.popupList.filter(n => n.id !== action.payload);
    },
    clearAllPopupNotifications: (state) => {
      state.popupList = [];
    },
  },
});

export const {
  addBarNotification,
  removeBarNotification,
  clearAllBarNotifications,
  addPopupNotification,
  removePopupNotification,
  clearAllPopupNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
