import React from 'react';
import {
  Content,
  ContentLine,
  ContentLineText,
  ContentRow,
  LeftContent,
  RightContent,
  SelectOption,
} from '@components/PlayList/styles';

const RefreshIntervalSetting = () => {
  return (
    <Content>
      <ContentRow>
        <LeftContent>
          <Content>
            <ContentLineText>Refresh Interval</ContentLineText>
          </Content>
        </LeftContent>
        <RightContent>
          <ContentLine>
            <SelectOption className="width50px">
              <option value="1" selected>
                1
              </option>
              <option value="3">3</option>
              <option value="10">10</option>
              <option value="60">60</option>
            </SelectOption>
            <ContentLineText>second</ContentLineText>
          </ContentLine>
        </RightContent>
      </ContentRow>
    </Content>
  );
};

export default RefreshIntervalSetting;
