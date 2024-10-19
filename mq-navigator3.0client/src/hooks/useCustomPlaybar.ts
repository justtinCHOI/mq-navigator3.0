import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLive } from '@slices/playbarSlice';

const useCustomMember = () => {
  const dispatch: AppDispatch = useDispatch();

  const isLive = useSelector((state: RootState) => state.playbarSlice.isLive); // Redux에서 isLive 가져오기

  const handleLiveToggle = () => {
    dispatch(toggleLive());
  };
  return { isLive, handleLiveToggle };
};

export default useCustomMember;
