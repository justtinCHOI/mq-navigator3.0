import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Gate } from '@typings/db';

// 초기 상태 정의
interface PlaybarState {
  selectedTime: number; // 시간(초 단위)
  selectedPoint: Gate | null;
}

const initialState: PlaybarState = {
  selectedTime: 0,
  selectedPoint: null,
};

const playbarSlice = createSlice({
  name: 'playbar',
  initialState,
  reducers: {
    // 1초마다 시간이 증가하는 액션
    incrementTime: (state, action: PayloadAction<number>) => {
      state.selectedTime += action.payload;
      // 시간이 변하면 selectedPoint도 업데이트 필요
    },
    // 사용자가 재생막대를 클릭했을 때
    setPoint: (state, action: PayloadAction<{ point: number; time: number }>) => {
      state.selectedPoint = action.payload.point as unknown as Gate; // 임의 변환, 실제 Gate를 찾아야 함
      state.selectedTime = action.payload.time;
    },
  },
});

export const { incrementTime, setPoint } = playbarSlice.actions;
export default playbarSlice.reducer;
