import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleLive,
  updateCurrentTime,
  updateSelectedPoint,
  updateSelectedTime,
  updateFirstGate,
  updateLastGate,
  updatePreviousGateBasedOnSelected,
  updateLatestGateBasedOnSelected,
  updateNextGateBasedOnSelected,
  updatePreviousGateBasedOnCurrent,
  updateLatestGateBasedOnCurrent,
  updateNextGateBasedOnCurrent,
} from '@slices/playbarSlice';
import { IGate, NullableIGate } from '@typings/db';
import { useEffect } from 'react';

const useCustomPlaybar = () => {
  const playbarState = useSelector((state: RootState) => state.playbarSlice); // Redux에서 플레이바 상태 가져오기
  const isLive = useSelector((state: RootState) => state.playbarSlice.isLive); // Redux에서 isLive 가져오기
  const dispatch: AppDispatch = useDispatch();

  // currentTime 매초 변경
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateCurrentTime());
    }, 1000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, [dispatch]);

  function updateSelectedTimeHook(selectedTime: string) {
    dispatch(updateSelectedTime(selectedTime));
  }

  function updateSelectedPointHook(selectedPoint: NullableIGate | null) {
    dispatch(updateSelectedPoint(selectedPoint));
  }

  function updateFirstGateHook(firstGate: IGate | null) {
    dispatch(updateFirstGate(firstGate));
  }

  function updateLastGateHook(lastGate: IGate | null) {
    dispatch(updateLastGate(lastGate));
  }

  function updatePreviousGateBasedOnSelectedHook(previousGate: IGate | null) {
    dispatch(updatePreviousGateBasedOnSelected(previousGate));
  }

  function updateLatestGateBasedOnSelectedHook(latestGate: IGate | null) {
    dispatch(updateLatestGateBasedOnSelected(latestGate));
  }

  function updateNextGateBasedOnSelectedHook(nextGate: IGate | null) {
    dispatch(updateNextGateBasedOnSelected(nextGate));
  }

  function updatePreviousGateBasedOnCurrentHook(previousGate: IGate | null) {
    dispatch(updatePreviousGateBasedOnCurrent(previousGate));
  }

  function updateLatestGateBasedOnCurrentHook(latestGate: IGate | null) {
    dispatch(updateLatestGateBasedOnCurrent(latestGate));
  }

  function updateNextGateBasedOnCurrentHook(nextGate: IGate | null) {
    dispatch(updateNextGateBasedOnCurrent(nextGate));
  }

  const handleLiveToggle = () => {
    dispatch(toggleLive());
  };

  return {
    playbarState,
    isLive,
    handleLiveToggle,
    updateSelectedTimeHook,
    updateSelectedPointHook,
    updateFirstGateHook,
    updateLastGateHook,
    updatePreviousGateBasedOnSelectedHook,
    updateLatestGateBasedOnSelectedHook,
    updateNextGateBasedOnSelectedHook,
    updatePreviousGateBasedOnCurrentHook,
    updateLatestGateBasedOnCurrentHook,
    updateNextGateBasedOnCurrentHook,
  };
};

export default useCustomPlaybar;
