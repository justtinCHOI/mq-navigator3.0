import React from 'react';
import {
  Content,
  ContentLine,
  ContentLineText,
  ContentRow,
  LeftContent,
  RightContent,
} from '@components/Playbar/styles';
import UseSelectOptionGateRange from '@hooks/UseSelectOptionGateRange';

const SpeedPredictionIntervalSetting = () => {
  return (
    <Content>
      <ContentRow>
        <LeftContent>
          <Content>
            <ContentLineText>Speed Prediction Interval</ContentLineText>
          </Content>
        </LeftContent>
        <RightContent>
          <UseSelectOptionGateRange />
        </RightContent>
      </ContentRow>
    </Content>
  );
};

export default SpeedPredictionIntervalSetting;
