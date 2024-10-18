import React from 'react';
import { Content, ContentLineText, ContentRow, LeftContent, RightContent } from '@components/Playbar/styles';
import UseSelectOptionColor from '@hooks/UseSelectOptionColor';

// ColorSetting 컴포넌트
const ColorSetting = () => {
  return (
    <Content>
      <ContentRow>
        <LeftContent>
          <Content>
            <ContentLineText>Colors</ContentLineText>
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

export default ColorSetting;
