import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Gate } from '@typings/db';

// 초기 상태 정의
const initialState: Gate[] = [];

const gatesSlice = createSlice({
  name: 'gateList',
  initialState,
  reducers: {
    // 특정 Gate 정보 업데이트
    updateGate: (state, action: PayloadAction<Gate>) => {
      const index = state.findIndex((gate) => gate.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    // 모든 Gate 업데이트
    updateAllGates: (state, action: PayloadAction<Gate[]>) => {
      return action.payload;
    },
  },
});

export const { updateGate, updateAllGates } = gatesSlice.actions;
export default gatesSlice.reducer;
