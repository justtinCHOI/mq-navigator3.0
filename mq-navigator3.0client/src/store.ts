import { configureStore } from '@reduxjs/toolkit';
import memberSlice from '@slices/memberSlice';
import workspaceSlice from '@slices/workspaceSlice';

export default configureStore({
  reducer: {
    memberSlice: memberSlice,
    workspaceSlice: workspaceSlice,
  },
});
