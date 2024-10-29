import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLive, updateSelectedPoint, updateSelectedTime } from '@slices/playbarSlice';
import { IGate } from '@typings/db';

const useCustomMember = () => {
  const dispatch: AppDispatch = useDispatch();
  const playbarState = useSelector((state: RootState) => state.playbarSlice); // Redux에서 isLive 가져오기
  const isLive = useSelector((state: RootState) => state.playbarSlice.isLive); // Redux에서 isLive 가져오기

  function updateSelectedTimeHook(selectedTime: string) {
    dispatch(updateSelectedTime(selectedTime));
  }

  function updateSelectedPointHook(selectedPoint: IGate | null) {
    dispatch(updateSelectedPoint(selectedPoint));
  }

  const handleLiveToggle = () => {
    dispatch(toggleLive());
  };
  return { playbarState, isLive, handleLiveToggle, updateSelectedTimeHook, updateSelectedPointHook };
};

export default useCustomMember;
