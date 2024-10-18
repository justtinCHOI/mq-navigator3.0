import { createSlice } from '@reduxjs/toolkit';
import { Gate, Playbar } from '@typings/db';

const initialState: Playbar = {
  selectedTime: null as unknown as Date,
  selectedPoint: null as unknown as Gate,
};

const playbarSlice = createSlice({
  name: 'playbarSlice',
  initialState,
  reducers: {
    // 1초마다 시간이 증가하는 액션
    incrementTime: () => {
      // 시간에 맞게 포인트 갱신
    },
    // 사용자가 재생막대를 클릭했을 때
    setPoint: () => {
      // 클릭한 위치에 맞게 포인트 변경
      // 포인트에 맞는 시간으로 갱신
    },
  },
});

export const { incrementTime, setPoint } = playbarSlice.actions;
export default playbarSlice.reducer;
