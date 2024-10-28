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
import { RefreshInterval } from '@typings/db';

interface RefreshIntervalSettingProps {
  refreshInterval: RefreshInterval;
  handleSettingChange: (value: RefreshInterval) => void;
}

const RefreshIntervalSetting: React.FC<RefreshIntervalSettingProps> = ({ refreshInterval, handleSettingChange }) => {
  const onChangeRefreshInterval = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSettingChange(e.target.value as RefreshInterval);
  };

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
            <SelectOption className="width60px" value={refreshInterval} onChange={onChangeRefreshInterval}>
              <option value={RefreshInterval.ONE}>1</option>
              <option value={RefreshInterval.THREE}>3</option>
              <option value={RefreshInterval.TEN}>10</option>
              <option value={RefreshInterval.SIXTY}>60</option>
            </SelectOption>
            <ContentLineText>second</ContentLineText>
          </ContentLine>
        </RightContent>
      </ContentRow>
    </Content>
  );
};

export default RefreshIntervalSetting;
