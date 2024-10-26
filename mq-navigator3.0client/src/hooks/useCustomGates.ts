import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { updateGatesAsync } from '@slices/gatesSlice';
import { MarkerPosition } from '@typings/db';

function UseCustomGates() {
  const dispatch: AppDispatch = useDispatch();
  const gatesState = useSelector((state: RootState) => state.gatesSlice);

  function updateGates(index: number, newPosition: MarkerPosition) {
    gatesState[index].coordinate = { latitude: newPosition.lat, longitude: newPosition.lng };
    dispatch(updateGatesAsync(gatesState));
  }
  return { gatesState, updateGates };
}

export default UseCustomGates;
