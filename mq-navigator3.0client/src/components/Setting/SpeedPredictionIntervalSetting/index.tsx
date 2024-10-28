import React from 'react';
import {
  Content,
  ContentLine,
  ContentLineText,
  ContentRow,
  LeftContent,
  RightContent,
  SelectOption,
} from '@components/Playbar/styles';
import { SpeedPredictionInterval } from '@typings/db';

interface SpeedPredictionIntervalSettingProps {
  speedPredictionInterval: SpeedPredictionInterval;
  handleSettingChange: (value: SpeedPredictionInterval) => void;
}

const SpeedPredictionIntervalSetting: React.FC<SpeedPredictionIntervalSettingProps> = ({
  speedPredictionInterval,
  handleSettingChange,
}) => {
  const onChangeSpeedPredictionInterval = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSettingChange(e.target.value as SpeedPredictionInterval);
  };
  return (
    <Content>
      <ContentRow>
        <LeftContent>
          <Content>
            <ContentLineText>Speed Prediction Interval</ContentLineText>
          </Content>
        </LeftContent>
        <RightContent>
          <ContentLine>
            <SelectOption
              style={{ width: '200px' }}
              value={speedPredictionInterval}
              onChange={onChangeSpeedPredictionInterval}
            >
              <option value={SpeedPredictionInterval.FIRST}>firstGate</option>
              <option value={SpeedPredictionInterval.PREVIOUS}>previousGate</option>
            </SelectOption>
            <ContentLineText style={{ width: '50px' }}>~</ContentLineText>
            <ContentLineText>latestGate</ContentLineText>
          </ContentLine>
        </RightContent>
      </ContentRow>
    </Content>
  );
};

export default SpeedPredictionIntervalSetting;
