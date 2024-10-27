import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { updateGatesAsync } from '@slices/gatesSlice';
import { Coordinate, IGate } from '@typings/db';
import { useParams } from 'react-router';

function UseCustomGates() {
  const dispatch: AppDispatch = useDispatch();
  const gatesState = useSelector((state: RootState) => state.gatesSlice);
  const { url } = useParams<{ url: string }>();

  function updateGatesWithIndex(index: number, newCoordinate: Coordinate) {
    // 상태의 복사본 생성 및 업데이트
    const updatedGates = [...gatesState];
    updatedGates[index] = {
      ...updatedGates[index],
      coordinate: newCoordinate,
    };
    if (url) {
      dispatch(updateGatesAsync({ url, gates: updatedGates }));
    }
  }

  function updateGatesHook(url: string, updateGates: IGate[]) {
    dispatch(updateGatesAsync({ url, gates: updateGates }));
  }
  return { gatesState, updateGatesWithIndex, updateGatesHook };
}

export default UseCustomGates;
