import React, { useState, useEffect, useCallback } from 'react';
import {
  PlaybarContainer,
  ContentLine,
  ContentLineDiv,
  RightContentIcon,
  SelectOption,
  ProgressBar,
  ProgressContainer,
  DistanceDisplay,
} from '@components/Playbar/styles';
import { transformTimeToPoint, transformPointToTime } from '@utils/physicsUtil';
import { IGate } from '@typings/db';
import useCustomPlaybar from '@hooks/useCustomPlaybar';

const Playbar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1);
  const { playbarState, updateSelectedTimeHook, updateSelectedPointHook } = useCustomPlaybar();
  const { selectedTime, selectedPoint } = playbarState;

  const changeSelectedPoint = useCallback(
    (newPoint: IGate | null) => {
      updateSelectedPointHook(newPoint);
      const newTime = transformPointToTime(newPoint);
      updateSelectedTimeHook(newTime);
    },
    [updateSelectedPointHook, updateSelectedTimeHook],
  );

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        const newTime = calculateNewTime(selectedTime, playSpeed); // 시간을 playSpeed만큼 증가
        updateSelectedTimeHook(newTime);
        const point = transformTimeToPoint(newTime); // selectedTime에 맞는 selectedPoint 계산
        updateSelectedPointHook(point);
      }, 1000); // 매 초마다 업데이트
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playSpeed, selectedTime, updateSelectedPointHook, updateSelectedTimeHook]);

  useEffect(() => {
    changeSelectedPoint(selectedPoint);
  }, [changeSelectedPoint, selectedPoint]);

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
        <ContentLineDiv></ContentLineDiv>
        <RightContentIcon className="fa-solid fa-backward"></RightContentIcon>
        <RightContentIcon className="fa-solid fa-pause" onClick={handlePlayPause}></RightContentIcon>
        <RightContentIcon className="fa-solid fa-play" onClick={handlePlayPause}></RightContentIcon>
        <RightContentIcon className="fa-solid fa-forward"></RightContentIcon>
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
      <ContentLine>
        <ContentLineDiv className="flex width100">
          <ProgressContainer>
            <ProgressBar type="range" value="0" max="100" />
            <DistanceDisplay>
              <span id="selectedTraveldDistance">km</span> / <span id="totalTraveldDistance">km</span>
            </DistanceDisplay>
          </ProgressContainer>
        </ContentLineDiv>
      </ContentLine>
    </PlaybarContainer>
  );
};

export default Playbar;
