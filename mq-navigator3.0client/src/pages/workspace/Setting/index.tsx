import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { ScrollZone, Section } from '@pages/workspace/Analyze/styles';
import RouteSetting from '@components/Setting/RouteSetting';
import ColorSetting from '@components/Setting/ColorSetting';
import RefreshIntervalSetting from '@components/Setting/RefreshIntervalSetting';
import ToleranceRangeSetting from '@components/Setting/ToleranceRangeSetting';
import SpeedPredictionIntervalSetting from '@components/Setting/SpeedPredictionIntervalSetting';
import DisplaySectionSetting from '@components/Setting/DisplaySectionSetting';
import SectionDataSetting from '@components/Setting/SectionDataSetting';

const Setting = () => {
  return (
    <ScrollZone style={{ height: 'calc((100vh - 102px) / 2)' }}>
      <Scrollbars>
        <Section>
          <ColorSetting />
        </Section>
        <Section>
          <RefreshIntervalSetting />
        </Section>
        <Section>
          <ToleranceRangeSetting />
        </Section>
        <Section>
          <SpeedPredictionIntervalSetting />
        </Section>
        <Section>
          <RouteSetting />
        </Section>
        <Section>
          <DisplaySectionSetting />
        </Section>
        <Section>
          <SectionDataSetting />
        </Section>
      </Scrollbars>
    </ScrollZone>
  );
};

export default Setting;
