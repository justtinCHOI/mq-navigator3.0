import React from 'react';
import { Content, ContentLineText, ContentRow, LeftContent, RightContent } from '@components/PlayList/styles';
import UseSelectOptionGate from '@hooks/UseSelectOptionGate';

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
          <UseSelectOptionGate />
        </RightContent>
      </ContentRow>
    </Content>
  );
};

export default SpeedPredictionIntervalSetting;
