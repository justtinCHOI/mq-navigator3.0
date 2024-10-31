import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGate, PlaybarState } from '@typings/db';

const initialState: PlaybarState = {
  currentTime: new Date().toISOString(),
  isLive: false,
  selectedTime: '',
  selectedPoint: null,
  firstGate: null,
  lastGate: null,
  previousGateBasedOnSelected: null,
  latestGateBasedOnSelected: null,
  nextGateBasedOnSelected: null,
  previousGateBasedOnCurrent: null,
  latestGateBasedOnCurrent: null,
  nextGateBasedOnCurrent: null,
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
    updateCurrentTime: (state) => {
      state.currentTime = new Date().toISOString(); // 매 시간마다 업데이트
    },
    updateSelectedTime: (state, action: PayloadAction<string>) => {
      state.selectedTime = action.payload;
    },
    updateSelectedPoint: (state, action: PayloadAction<IGate | null>) => {
      state.selectedPoint = action.payload;
    },
    updateFirstGate: (state, action: PayloadAction<IGate | null>) => {
      state.firstGate = action.payload;
    },
    updateLastGate: (state, action: PayloadAction<IGate | null>) => {
      state.lastGate = action.payload;
    },
    updatePreviousGateBasedOnSelected: (state, action: PayloadAction<IGate | null>) => {
      state.previousGateBasedOnSelected = action.payload;
    },
    updateLatestGateBasedOnSelected: (state, action: PayloadAction<IGate | null>) => {
      state.latestGateBasedOnSelected = action.payload;
    },
    updateNextGateBasedOnSelected: (state, action: PayloadAction<IGate | null>) => {
      state.nextGateBasedOnSelected = action.payload;
    },
    updatePreviousGateBasedOnCurrent: (state, action: PayloadAction<IGate | null>) => {
      state.previousGateBasedOnCurrent = action.payload;
    },
    updateLatestGateBasedOnCurrent: (state, action: PayloadAction<IGate | null>) => {
      state.latestGateBasedOnCurrent = action.payload;
    },
    updateNextGateBasedOnCurrent: (state, action: PayloadAction<IGate | null>) => {
      state.nextGateBasedOnCurrent = action.payload;
    },
  },
});

export const {
  toggleLive,
  setLive,
  updateSelectedTime,
  updateSelectedPoint,
  updateCurrentTime,
  updateLatestGateBasedOnCurrent,
  updateLatestGateBasedOnSelected,
  updateNextGateBasedOnCurrent,
  updateNextGateBasedOnSelected,
  updatePreviousGateBasedOnCurrent,
  updatePreviousGateBasedOnSelected,
  updateLastGate,
  updateFirstGate,
} = playbarSlice.actions;
export default playbarSlice.reducer;
