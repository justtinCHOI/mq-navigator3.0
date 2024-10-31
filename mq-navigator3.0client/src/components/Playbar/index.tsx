import React, { useState, useEffect, useCallback } from 'react';
import {
  PlaybarContainer,
  ContentLine,
  ContentLineDiv,
  RightContentIcon,
  SelectOption,
  ProgressBar,
  ProgressContainer,
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
import { IGate } from '@typings/db';
import useCustomPlaybar from '@hooks/useCustomPlaybar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';

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
  const [playSpeed, setPlaySpeed] = useState(1);
  const [totalDistance, setTotalDistance] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState<number>(0);
  const { selectedTime, selectedPoint } = playbarState;
  const dispatch: AppDispatch = useDispatch();

  // initial 값은 selectedPoint, firstGate, lastGate  가 있어야 한다.
  // selectedPoint 가 변경하는 것들 : selectedTime ~~GateBasedOnSelected, ...
  // gatesState 가 변경하는 것 들 :  changeSelectedPoint [selectedPoint, selectedTime,  ~~GateBasedOnSelected, ...],
  //                               changeCurrent [~~BasedOnCurrent, ..., firstGate, lastGate]

  // selectedTime 초기 상태
  useEffect(() => {
    if (gatesState && gatesState.length > 0 && gatesState[0].time) {
      const newGate = gatesState[0];
      changeSelectedPoint(newGate);
      updateFirstGateHook(gatesState[0]);
      const gateStateLength = gatesState.length;
      updateLastGateHook(gatesState[gateStateLength - 1]);
      const latestGate = findLatestGate(gatesState);
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
    } else {
      console.warn('gatesState가 비어 있습니다. 기본 시간을 설정합니다.');
      const defaultTime = new Date().toISOString();
      changeSelectedTime(defaultTime);
    }
  }, [gatesState]);

  // selectedTime 매초 번경
  useEffect(() => {
    if (selectedTime != '' && isPlaying) {
      const interval = setInterval(() => {
        // const newTime = new Date(new Date(playbarState.selectedTime).getTime() + 1000).toISOString();
        const newTime = calculateNewTime(selectedTime, playSpeed); // 시간을 playSpeed만큼 증가

        changeSelectedTime(newTime);
      }, 1000);

      return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
    }
  }, [dispatch, isPlaying, playSpeed, playbarState.selectedTime, selectedTime]);

  // selectedGate 변경 시 -> selectedTime ~~GateBasedOnSelected, ... 변경,
  useEffect(() => {
    changeSelectedPoint(selectedPoint);
  }, [selectedPoint]);

  // selectedGate -> selectedTime ~~GateBasedOnSelected, ... 변경,
  const changeSelectedPoint = useCallback(
    (newPoint: IGate | null) => {
      updateSelectedPointHook(newPoint);
      const newTime = transformPointToTime(gatesState, newPoint);
      updateSelectedTimeHook(newTime);
      const { forwardGateWithTraveledDistance, backwardGateWithTraveledDistance } =
        findForwardAndBackwardGateWithTraveledDistance(
          gatesState,
          selectedPoint ? selectedPoint.traveledDistance : null,
        );
      let previousGate: IGate | null = null;
      if (forwardGateWithTraveledDistance != null && forwardGateWithTraveledDistance.sequence > 0) {
        previousGate = gatesState[forwardGateWithTraveledDistance.sequence - 1];
      }
      updatePreviousGateBasedOnSelectedHook(previousGate);
      updateLatestGateBasedOnSelectedHook(forwardGateWithTraveledDistance);
      updateNextGateBasedOnSelectedHook(backwardGateWithTraveledDistance);
    },
    [updateSelectedPointHook, updateSelectedTimeHook],
  );

  // selectedTime -> selectedPoint 도 변경
  const changeSelectedTime = useCallback(
    (newTime: string) => {
      updateSelectedTimeHook(newTime);
      const point = transformTimeToPoint(gatesState, newTime);
      console.log('Playbar changeSelectedTime point : ', point);
      updateSelectedPointHook(point);
    },
    [updateSelectedPointHook, updateSelectedTimeHook],
  );

  // ProgressBar 클릭 핸들러
  const handleProgressBarClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    setProgressBarWidth(progressBarWidth);
    console.log('setProgressBarWidth : ', progressBarWidth);
    const clickRatio = clickPosition / progressBarWidth;
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
        time: selectedTime,
        coordinate: newCoordinate,
        traveledDistance: newTraveledDistance,
      };

      changeSelectedPoint(newGate);
    }
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPlaySpeed(parseFloat(e.target.value));

  function calculateNewTime(selectedTime: string, playSpeed: number): string {
    const currentTime = new Date(selectedTime);

    const timeIncrement = 1000 * playSpeed; // 1초 * playSpeed

    const newTime = new Date(currentTime.getTime() + timeIncrement);

    return newTime.toISOString();
  }

  return (
    <PlaybarContainer>
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
            isPlaying {isPlaying ? <p>true</p> : <p>false</p>}
          </ContentLineText>
          <ContentLineText className={'whiteFont margin0 padding0'}>
            playSpeed {playSpeed ? <p>{playSpeed}</p> : <p>null</p>}
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
              value={selectedPoint?.traveledDistance ? (selectedPoint.traveledDistance / totalDistance) * 100 : 0}
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
