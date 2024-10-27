import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { ISetting } from '@typings/db';
import { updateSettingAsync } from '@slices/settingSlice';

function UseCustomSetting() {
  const dispatch: AppDispatch = useDispatch();
  const settingState = useSelector((state: RootState) => state.settingSlice);

  function updateSettingHook(url: string, updateSetting: ISetting) {
    dispatch(updateSettingAsync({ url, setting: updateSetting }));
  }
  return { settingState, updateSettingHook };
}

export default UseCustomSetting;
