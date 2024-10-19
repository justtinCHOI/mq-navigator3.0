import { configureStore } from '@reduxjs/toolkit';
import memberSlice from '@slices/memberSlice';
import workspaceSlice from '@slices/workspaceSlice';
import playbarSlice from '@slices/playbarSlice';
import gatesSlice from '@slices/gatesSlice';
// import settingSlice from '@slices/settingSlice';

// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch 타입 정의
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    memberSlice: memberSlice,
    workspaceSlice: workspaceSlice,
    playbarSlice: playbarSlice,
    gatesSlice: gatesSlice,
    // settingSlice: settingSlice,
  },
});

export default store;
