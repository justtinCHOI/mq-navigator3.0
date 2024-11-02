import React, { useState, useEffect, useCallback } from 'react';
import {
  PlaybarContainer,
  ContentLine,
  ContentLineDiv,
  RightContentIcon,
  SelectOption,
  ProgressBar,
  ContentLineText,
  RightContent,
  GateMarker,
} from '@components/Playbar/styles';
import {
  transformTimeToPoint,
  transformPointToTime,
  findForwardAndBackwardGateWithTraveledDistance,
  findLatestGate,
  findTraveledCoordinateWithForwardAndBackwardGateAndTraveledDistance,
} from '@utils/physicsUtil';
import { IGate, NullableIGate } from '@typings/db';
import useCustomPlaybar from '@hooks/useCustomPlaybar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ResetButton } from '@components/Map/styles';

const Playbar = () => {
  const gatesState = useSelector((state: RootState) => state.gatesSlice);
  const {
    playbarState,
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
  } = useCustomPlaybar();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1);
  const [totalDistance, setTotalDistance] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState<number>(0);
  const [progressBarValue, setProgressBarValue] = useState<number>(0);

  // initial 값은 selectedPoint, firstGate, lastGate  가 있어야 한다.
  // gatesState 가 변경하는 것 들 :  changeSelectedPoint() [selectedPoint, selectedTime,  ~~GateBasedOnSelected, ...],
  //                               changeGatesBasedOnCurrent() [firstGate, lastGate, ~~BasedOnCurrent, ... ]

  // 초기 상태
  useEffect(() => {
    if (gatesState && gatesState.length > 0) {
      const newGate = gatesState[0];
      changeSelectedPoint(newGate);
      changeGatesBasedOnCurrent();
    }
  }, [gatesState]);

  // progressBar 값  업데이트
  useEffect(() => {
    if (playbarState.selectedPoint?.traveledDistance != null && totalDistance > 0) {
      const newValue = (playbarState.selectedPoint.traveledDistance / totalDistance) * 100;
      setProgressBarValue(newValue);
    }
  }, [playbarState.selectedPoint?.traveledDistance, totalDistance]);

  // 재생시 1초마다 selectedTime 변경
  useEffect(() => {
    if (isPlaying && playbarState.selectedTime) {
      const interval = setInterval(() => {
        if (playbarState.selectedTime) {
          const newTime = calculateNewTime(playbarState.selectedTime, playSpeed);
          changeSelectedTime(newTime);
        }
      }, 1000 / playSpeed);

      return () => clearInterval(interval);
    }
  }, [isPlaying, playSpeed, playbarState.selectedTime]);

  // selectedPoint -> selectedTime ~~GateBasedOnSelected, ... 변경,
  const changeSelectedPoint = useCallback(
    (newPoint: NullableIGate | null) => {
      if (newPoint?.traveledDistance != null) {
        const newTime = transformPointToTime(gatesState, newPoint);
        if (newTime) {
          updateSelectedTimeHook(newTime);
        }
        changeGatesBasedOnSelected(newPoint?.traveledDistance);
      }
      updateSelectedPointHook(newPoint);
    },
    [gatesState, updateSelectedPointHook, updateSelectedTimeHook],
  );

  // selectedPoint -> selectedTime ~~GateBasedOnSelected, ... 변경,
  const changeSelectedPointNotChangingSelectedTime = useCallback(
    (newPoint: NullableIGate | null) => {
      updateSelectedPointHook(newPoint);
      if (newPoint?.traveledDistance != null) {
        changeGatesBasedOnSelected(newPoint?.traveledDistance);
      }
    },
    [updateSelectedPointHook],
  );

  const changeGatesBasedOnSelected = useCallback(
    (selectedTraveledDistance: number | null) => {
      // selectedTraveledDistance -> previous, latest, next gate 결정
      const { forwardGateWithTraveledDistance, backwardGateWithTraveledDistance } =
        findForwardAndBackwardGateWithTraveledDistance(gatesState, selectedTraveledDistance);
      let previousGate: IGate | null = null;
      if (forwardGateWithTraveledDistance != null && forwardGateWithTraveledDistance.sequence > 0) {
        previousGate = gatesState[forwardGateWithTraveledDistance.sequence - 1];
      }
      updatePreviousGateBasedOnSelectedHook(previousGate);
      updateLatestGateBasedOnSelectedHook(forwardGateWithTraveledDistance);
      updateNextGateBasedOnSelectedHook(backwardGateWithTraveledDistance);
    },
    [
      gatesState,
      updateLatestGateBasedOnSelectedHook,
      updateNextGateBasedOnSelectedHook,
      updatePreviousGateBasedOnSelectedHook,
    ],
  );

  const changeGatesBasedOnCurrent = useCallback(() => {
    // firstGate
    updateFirstGateHook(gatesState[0]);
    // lastGate
    const gateStateLength = gatesState.length;
    updateLastGateHook(gatesState[gateStateLength - 1]);
    const latestGate = findLatestGate(gatesState);
    // ~~BasedOnCurrent
    let previousGate = null;
    let nextGate = null;
    if (latestGate != null && latestGate.sequence > 0) {
      previousGate = gatesState[latestGate.sequence - 1];
    }
    if (latestGate != null && latestGate.sequence < gateStateLength - 1) {
      nextGate = gatesState[latestGate.sequence + 1];
    }
    updatePreviousGateBasedOnCurrentHook(previousGate);
    updateLatestGateBasedOnCurrentHook(latestGate);
    updateNextGateBasedOnCurrentHook(nextGate);
    if (latestGate?.traveledDistance) {
      setTotalDistance(latestGate?.traveledDistance);
    }
  }, [
    gatesState,
    updateFirstGateHook,
    updateLastGateHook,
    updateLatestGateBasedOnCurrentHook,
    updateNextGateBasedOnCurrentHook,
    updatePreviousGateBasedOnCurrentHook,
  ]);

  // selectedTime -> selectedPoint 도 변경
  const changeSelectedTime = useCallback(
    (newTime: string) => {
      updateSelectedTimeHook(newTime);
      const point = transformTimeToPoint(gatesState, newTime);
      changeSelectedPointNotChangingSelectedTime(point);
    },
    [changeSelectedPointNotChangingSelectedTime, gatesState, updateSelectedTimeHook],
  );

  // ProgressBar 클릭 핸들러
  const handleProgressBarClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    setProgressBarWidth(progressBarWidth);
    const clickRatio = clickPosition / progressBarWidth;
    // 클릭 위치에 비례해서 selectedTraveledDistance 구하기
    const newTraveledDistance = totalDistance * clickRatio;
    // `traveledDistance`에 근접한 (time 무시) forward/backward 게이트 찾기
    const { forwardGateWithTraveledDistance, backwardGateWithTraveledDistance } =
      findForwardAndBackwardGateWithTraveledDistance(gatesState, newTraveledDistance);
    if (forwardGateWithTraveledDistance != null && backwardGateWithTraveledDistance != null) {
      // 중간 `traveledDistance` ->  중간 'coordinate'
      const newCoordinate = findTraveledCoordinateWithForwardAndBackwardGateAndTraveledDistance(
        forwardGateWithTraveledDistance,
        backwardGateWithTraveledDistance,
        newTraveledDistance,
      );
      const newGate = {
        id: 0,
        sequence: 0,
        time: playbarState.selectedTime,
        coordinate: newCoordinate,
        traveledDistance: newTraveledDistance,
      };
      changeSelectedPoint(newGate);
    }
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPlaySpeed(parseFloat(e.target.value));

  const calculateNewTime = useCallback((selectedTime: string, playSpeed: number) => {
    const dateTime = new Date(selectedTime);

    const timeIncrement = 1000 * playSpeed; // 1초 * playSpeed

    const newTime = new Date(dateTime.getTime() + timeIncrement);

    // console.log('dateTime, timeIncrement, newTime : ', dateTime, timeIncrement, newTime);

    return newTime.toISOString();
  }, []);

  const handleResetSelectedTime = useCallback(() => {
    const newTime = new Date().toISOString();
    updateSelectedTimeHook(newTime);
    console.log('resetButton newTime : ', newTime);
  }, [updateSelectedTimeHook]);

  return (
    <PlaybarContainer>
      <ResetButton onClick={handleResetSelectedTime}></ResetButton>
      <ContentLine>
        <RightContentIcon className="fa-solid fa-backward"></RightContentIcon>
        {isPlaying ? (
          <>
            <RightContentIcon className={'fa-solid fa-pause'} onClick={handlePlayPause} />
            <RightContentIcon className={'fa-solid fa-play dimmed'} />
          </>
        ) : (
          <>
            <RightContentIcon className={'fa-solid fa-pause dimmed'} />
            <RightContentIcon className={'fa-solid fa-play'} onClick={handlePlayPause} />
          </>
        )}
        <RightContentIcon className="fa-solid fa-forward"></RightContentIcon>
        <ContentLine>
          <ContentLineText className={'whiteFont margin0 padding0'}>
            isPlaying {isPlaying ? 'true' : 'false'}
          </ContentLineText>
          <ContentLineText className={'whiteFont margin0 padding0'}>
            playSpeed {playSpeed ? playSpeed : 'null'}
          </ContentLineText>
        </ContentLine>
        <SelectOption onChange={handleSpeedChange}>
          <option value="0.25">X 0.25</option>
          <option value="0.5">X 0.5</option>
          <option value="1" selected>
            X 1.0
          </option>
          <option value="2">X 2.0</option>
          <option value="4">X 4.0</option>
        </SelectOption>
      </ContentLine>
      <RightContent>
        <ContentLine className={'jcCenter'}>
          <ContentLineDiv className={'flex width100 relative shortenHeight'}>
            <ProgressBar
              type="range"
              // defaultValue={
              //   playbarState.selectedPoint?.traveledDistance
              //     ? (playbarState.selectedPoint.traveledDistance / totalDistance) * 100
              //     : 0
              // }
              value={progressBarValue} // progressBar 값 설정
              max="100"
              onClick={handleProgressBarClick}
            />
          </ContentLineDiv>
        </ContentLine>
        <ContentLine className={'jcCenter'}>
          <ContentLineDiv style={{ width: `${progressBarWidth}px` }} className={'flex relative shortenHeight'}>
            {gatesState.map((gate) => (
              <GateMarker key={gate.sequence} style={{ left: `${(gate.traveledDistance / totalDistance) * 100}%` }}>
                {gate.sequence}
              </GateMarker>
            ))}
          </ContentLineDiv>
        </ContentLine>
      </RightContent>
    </PlaybarContainer>
  );
};

export default Playbar;
