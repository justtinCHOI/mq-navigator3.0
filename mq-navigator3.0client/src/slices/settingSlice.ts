import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Color,
  IGate,
  ISetting,
  Location,
  RefreshInterval,
  SectionData,
  SpeedPredictionInterval,
  ToleranceRange,
} from '@typings/db';
import { getSetting, updateSetting } from '@api/settingApi';

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
export const getSettingAsync = createAsyncThunk('getSettingAsync', async (url: string) => {
  return await getSetting(url);
});

interface UpdateSettingPayload {
  url: string;
  setting: ISetting;
}

export const updateSettingAsync = createAsyncThunk(
  'updateSettingAsync',
  async ({ url, setting }: UpdateSettingPayload) => {
    return await updateSetting(url, setting);
  },
);

// SettingSlice 정의
const settingSlice = createSlice({
  name: 'settingSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSettingAsync.fulfilled, (state, action: PayloadAction<ISetting>) => {
        console.log('getSettingAsync.fulfilled');
        return action.payload;
      })
      .addCase(updateSettingAsync.fulfilled, (state, action: PayloadAction<ISetting>) => {
        console.log('updateSettingAsync.fulfilled');
        return action.payload;
      })
      .addCase(getSettingAsync.rejected, () => {
        console.log('getSettingAsync.rejected');
      })
      .addCase(updateSettingAsync.rejected, () => {
        console.log('updateSettingAsync.rejected');
      });
  },
});

export default settingSlice.reducer;
