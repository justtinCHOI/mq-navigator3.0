import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Setting } from '@typings/db';
import { fetchSetting } from '@api/settingApi';

// 초기 상태 정의
const initialState: Setting | null = null;

// Setting 정보를 비동기로 받아오는 액션
export const fetchSettingAsync = createAsyncThunk('fetchSettingAsync', async (memberId: number) => {
  const setting = await fetchSetting(memberId);
  return setting;
});

// SettingSlice 정의
const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSettingAsync.fulfilled, (state, action: PayloadAction<Setting>) => {
      return action.payload;
    });
  },
});

export default settingSlice.reducer;
