import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlaybarState } from '@typings/db';

const initialState: PlaybarState = {
  currentTime: null,
  isLive: false,
  selectedTime: null,
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
    // // selectedPoint에 따라 관련 상태 업데이트
    // updateBasedOnSelected: (state, action: PayloadAction<Gate>) => {
    //   const selectedGate = action.payload;
    //   state.previousGateBasedOnSelected = /* 로직으로 계산 */;
    //   state.latestGateBasedOnSelected = /* 로직으로 계산 */;
    //   state.nextGateBasedOnSelected = /* 로직으로 계산 */;
    // },
  },
});

export const { toggleLive, setLive } = playbarSlice.actions;
export default playbarSlice.reducer;
