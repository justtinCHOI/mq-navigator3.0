// 초기 상태 정의
import {IGate, NullableIGate} from '@typings/db';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getGates, updateGates } from '@api/gatesApi';

const initialState: IGate[] = [];

// Setting 정보를 비동기로 받아오는 액션
export const getGatesAsync = createAsyncThunk('getGatesAsync', async (url: string) => {
  return await getGates(url);
});

interface UpdateGatesPayload {
  url: string;
  gates: NullableIGate[];
}

export const updateGatesAsync = createAsyncThunk('updateGatesAsync', async ({ url, gates }: UpdateGatesPayload) => {
  return await updateGates(url, gates);
});

const gatesSlice = createSlice({
  name: 'gateList',
  initialState,
  reducers: {
    // 특정 Gate 정보 업데이트
    updateGate: (state, action: PayloadAction<IGate>) => {
      const index = state.findIndex((gate) => gate.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    // 모든 Gate 업데이트
    updateAllGates: (state, action: PayloadAction<IGate[]>) => {
      return action.payload;
    },
    deleteGatesState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGatesAsync.fulfilled, (state, action: PayloadAction<IGate[]>) => {
        console.log('getGatesAsync.fulfilled');
        return action.payload;
      })
      .addCase(updateGatesAsync.fulfilled, (state, action: PayloadAction<IGate[]>) => {
        console.log('updateGatesAsync.fulfilled');
        return action.payload;
      })
      .addCase(getGatesAsync.rejected, () => {
        console.log('getGatesAsync.rejected');
      })
      .addCase(updateGatesAsync.rejected, () => {
        console.log('loginPostAsync rejected');
      });
  },
});

export const { updateGate, updateAllGates, deleteGatesState } = gatesSlice.actions;
export default gatesSlice.reducer;
