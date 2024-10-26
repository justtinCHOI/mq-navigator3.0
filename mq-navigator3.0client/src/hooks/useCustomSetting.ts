import { useSelector } from 'react-redux';
import { RootState } from '../store';

function UseCustomSetting() {
  const settingState = useSelector((state: RootState) => state.settingSlice);
  return { settingState };
}

export default UseCustomSetting;
