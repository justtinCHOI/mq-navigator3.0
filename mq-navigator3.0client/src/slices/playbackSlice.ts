import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlaybackState {
  selectedTime: number;
  selectedPoint: number;
}

const initialState: PlaybackState = {
  selectedTime: 0,
  selectedPoint: 0,
};

const playbackSlice = createSlice({
  name: 'playbackSlice',
  initialState,
  reducers: {
    // 1초마다 시간이 증가하는 액션
    incrementTime: (state) => {
      state.selectedTime += 1;
      state.selectedPoint = state.selectedTime; // 시간에 맞게 포인트 갱신
    },
    // 사용자가 재생막대를 클릭했을 때
    setPoint: (state, action: PayloadAction<number>) => {
      state.selectedPoint = action.payload; // 클릭한 위치에 맞게 포인트 변경
      state.selectedTime = action.payload; // 포인트에 맞는 시간으로 갱신
    },
  },
});

export const { incrementTime, setPoint } = playbackSlice.actions;
export default playbackSlice.reducer;
