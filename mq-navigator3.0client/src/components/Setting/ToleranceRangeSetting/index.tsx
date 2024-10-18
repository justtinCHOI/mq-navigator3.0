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

const ToleranceRangeSetting = () => {
  return (
    <Content>
      <ContentRow>
        <LeftContent>
          <Content>
            <ContentLineText>Tolerance Range</ContentLineText>
          </Content>
        </LeftContent>
        <RightContent>
          <ContentLine>
            <SelectOption className="width50px">
              <option value="5" selected>
                5
              </option>
              <option value="10">10</option>
              <option value="20">20</option>
            </SelectOption>
            <ContentLineText>second</ContentLineText>
          </ContentLine>
        </RightContent>
      </ContentRow>
    </Content>
  );
};

export default ToleranceRangeSetting;
