import React, { useEffect, useState } from 'react';
import { Content, ContentLine, ContentLineText } from '@components/Playbar/styles';
import { IGate, Location, SectionData, SpeedPredictionInterval } from '@typings/db';
import { convertLocationToString } from '@utils/enumUtil';
import useCustomGates from '@hooks/useCustomGates';
import useCustomPlaybar from '@hooks/useCustomPlaybar';
import {
  calculateDistance,
  calculateSpeed,
  calculateTime,
  formatToTwoDecimalPlaces,
  getGateByLocation,
} from '@utils/displayUtil';

interface EachDisplayDataProps {
  start: Location;
  end: Location;
  sectionDatas: SectionData[];
  speedPredictionInterval: SpeedPredictionInterval;
}

const EachDisplay: React.FC<EachDisplayDataProps> = ({ start, end, sectionDatas, speedPredictionInterval }) => {
  const { gatesState } = useCustomGates();
  const { playbarState } = useCustomPlaybar();
  const [startGate, setStartGate] = useState<IGate | null>(null);
  const [endGate, setEndGate] = useState<IGate | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [elaspedTime, setElaspedTime] = useState<number | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);
  const [elaspedSpeed, setElaspedSpeed] = useState<number | null>(null);
  const [estimatedSpeed, setEstimatedSpeed] = useState<number | null>(null);

  useEffect(() => {
    setStartGate(getGateByLocation(playbarState, start));
    setEndGate(getGateByLocation(playbarState, end));
    // 거리
    const newDistance = calculateDistance(startGate, endGate);
    setDistance(newDistance);
    // 걸린 시간
    const newElaspedTime = calculateTime(startGate, endGate);
    setElaspedTime(newElaspedTime);
    // 속도
    const newElaspedSpeed = calculateSpeed(startGate, endGate);
    setElaspedSpeed(newElaspedSpeed);

    // 추정 속도 <- playbarState
    let endTime: string | null = null;
    let startTime: string | null = null;
    if (speedPredictionInterval == SpeedPredictionInterval.FIRST) {
      if (playbarState?.latestGateBasedOnCurrent?.time) {
        endTime = playbarState?.latestGateBasedOnCurrent?.time;
      }
      if (playbarState?.firstGate?.time) {
        startTime = playbarState?.firstGate?.time;
      }
    } else if (speedPredictionInterval == SpeedPredictionInterval.PREVIOUS) {
      if (playbarState?.latestGateBasedOnCurrent?.time) {
        endTime = playbarState?.latestGateBasedOnCurrent?.time;
      }
      if (playbarState?.previousGateBasedOnCurrent?.time) {
        startTime = playbarState?.previousGateBasedOnCurrent?.time;
      }
    }
    if (endTime && startTime && distance) {
      const newEstimatedSpeed = distance / (new Date(endTime).getTime() - new Date(startTime).getTime());
      setEstimatedSpeed(newEstimatedSpeed);
      // 추정 시간 <- 거리 / 추정 속도
      const newEstimatedTime = distance / newEstimatedSpeed;
      setEstimatedTime(newEstimatedTime);
    }
  }, [start, end, gatesState]);

  return (
    <Content>
      <ContentLine>
        <ContentLineText className="width300px">
          {convertLocationToString(start)} ~ {convertLocationToString(end)}
        </ContentLineText>
        {sectionDatas.includes(SectionData.DISTANCE) && (
          <ContentLineText className="flex">{formatToTwoDecimalPlaces(distance)}</ContentLineText>
        )}
        {sectionDatas.includes(SectionData.ELAPSED_TIME) && (
          <ContentLineText className="flex">{formatToTwoDecimalPlaces(elaspedTime)}</ContentLineText>
        )}
        {sectionDatas.includes(SectionData.ESTIMATED_TIME) && (
          <ContentLineText className="flex">{formatToTwoDecimalPlaces(estimatedTime)}</ContentLineText>
        )}
        {sectionDatas.includes(SectionData.ELAPSED_SPEED) && (
          <ContentLineText className="flex">{formatToTwoDecimalPlaces(elaspedSpeed)}</ContentLineText>
        )}
        {sectionDatas.includes(SectionData.ESTIMATED_SPEED) && (
          <ContentLineText className="flex">{formatToTwoDecimalPlaces(estimatedSpeed)}</ContentLineText>
        )}
      </ContentLine>
    </Content>
  );
};

export default EachDisplay;
