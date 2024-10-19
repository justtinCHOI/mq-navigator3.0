import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Color,
  ISetting,
  Location,
  RefreshInterval,
  SectionData,
  SpeedPredictionInterval,
  ToleranceRange,
} from '@typings/db';
import { getSetting } from '@api/settingApi';

// 초기 상태 정의
const initialState: ISetting = {
  id: 0,
  workspaceId: 0,
  colorSetting: {
    initialColor: Color.SKY_BLUE,
    decelerationColor: Color.PURPLE,
    constantSpeedColor: Color.LIGHT_GREEN,
    accelerationColor: Color.YELLOW,
  },
  refreshInterval: RefreshInterval.ONE,
  toleranceRange: ToleranceRange.FIVE,
  speedPredictionInterval: SpeedPredictionInterval.FIRST,
  displaySections: [
    {
      start: Location.FIRST_GATE,
      end: Location.LAST_GATE,
    },
  ],
  sectionDatas: [SectionData.DISTANCE, SectionData.ELAPSED_TIME],
};

// Setting 정보를 비동기로 받아오는 액션
export const fetchSettingAsync = createAsyncThunk('fetchSettingAsync', async (url: string) => {
  return await getSetting(url);
});

// SettingSlice 정의
const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSettingAsync.fulfilled, (state, action: PayloadAction<ISetting>) => {
      return action.payload;
    });
  },
});

export default settingSlice.reducer;
