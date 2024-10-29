import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGate, PlaybarState } from '@typings/db';

const initialState: PlaybarState = {
  currentTime: '',
  isLive: false,
  selectedTime: '',
  selectedPoint: null,
  firstGate: null,
  lastGate: null,
  previousGateBasedOnSelected: null,
  latestGateBasedOnSelected: null,
  nextGateBasedOnSelected: null,
};

const playbarSlice = createSlice({
  name: 'playbarSlice',
  initialState,
  reducers: {
    toggleLive: (state) => {
      state.isLive = !state.isLive; // isLive 상태 토글
    },
    setLive: (state, action: PayloadAction<boolean>) => {
      state.isLive = action.payload; // isLive 상태 설정
    },
    updateSelectedTime: (state, action: PayloadAction<string>) => {
      state.selectedTime = action.payload;
    },
    updateSelectedPoint: (state, action: PayloadAction<IGate | null>) => {
      state.selectedPoint = action.payload;
    },
    // selectedPoint에 따라 관련 상태 업데이트
    // updateBasedOnSelected: (state, action: PayloadAction<IGate>) => {
    //   const selectedGate = action.payload;
    //   state.previousGateBasedOnSelected = /* 로직으로 계산 */;
    //   state.latestGateBasedOnSelected = /* 로직으로 계산 */;
    //   state.nextGateBasedOnSelected = /* 로직으로 계산 */;
    // },
  },
});

export const { toggleLive, setLive, updateSelectedTime, updateSelectedPoint } = playbarSlice.actions;
export default playbarSlice.reducer;
