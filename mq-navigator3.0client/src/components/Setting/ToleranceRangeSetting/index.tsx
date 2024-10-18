import React from 'react';
import { Content, ContentLineText, ContentRow, LeftContent, RightContent } from '@components/PlayList/styles';
import UseSelectOptionColor from '@hooks/UseSelectOptionColor';

const ToleranceRangeSetting = () => {
  return (
    <Content>
      <ContentRow>
        <LeftContent>
          <Content>
            <ContentLineText>Tolerance Rage</ContentLineText>
          </Content>
        </LeftContent>
        <RightContent>
          <Content>
            <UseSelectOptionColor phase="Initial Phase" />
            <UseSelectOptionColor phase="Deceleration Phase" />
            <UseSelectOptionColor phase="Acceleration Phase" />
            <UseSelectOptionColor phase="Constant Speed Phase" />
          </Content>
        </RightContent>
      </ContentRow>
    </Content>
  );
};

export default ToleranceRangeSetting;
