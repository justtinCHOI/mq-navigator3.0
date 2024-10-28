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
import { ToleranceRange } from '@typings/db';

interface ToleranceRangeSettingProps {
  toleranceRange: ToleranceRange;
  handleSettingChange: (value: ToleranceRange) => void;
}

const ToleranceRangeSetting: React.FC<ToleranceRangeSettingProps> = ({ toleranceRange, handleSettingChange }) => {
  const onChangeToleranceRange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSettingChange(e.target.value as ToleranceRange);
  };

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
            <SelectOption className="width60px" value={toleranceRange} onChange={onChangeToleranceRange}>
              <option value={ToleranceRange.FIVE}>5</option>
              <option value={ToleranceRange.TEN}>10</option>
              <option value={ToleranceRange.TWENTY}>20</option>
            </SelectOption>
            <ContentLineText>second</ContentLineText>
          </ContentLine>
        </RightContent>
      </ContentRow>
    </Content>
  );
};

export default ToleranceRangeSetting;
