import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { ScrollZone, Section } from '@pages/workspace/Analyze/styles';
import RouteSetting from '@components/Setting/RouteSetting';
import ColorSetting from '@components/Setting/ColorSetting';
import RefreshIntervalSetting from '@components/Setting/RefreshIntervalSetting';
import ToleranceRangeSetting from '@components/Setting/ToleranceRangeSetting';
import SpeedPredictionIntervalSetting from '@components/Setting/SpeedPredictionIntervalSetting';
import DisplaySectionSetting from '@components/Setting/DisplaySectionSetting';
import SectionDataSetting from '@components/Setting/SectionDataSetting';
import { ContentLine, CustomTextButton } from '@components/Playbar/styles';
import { ISetting } from '@typings/db';
import useCustomSetting from '@hooks/useCustomSetting';
import { useParams } from 'react-router';

const Setting = () => {
  const { settingState, updateSettingHook } = useCustomSetting();
  const [isModifiable, setIsModifiable] = useState<boolean>(false);
  const [updateSettingState, setUpdateSettingState] = useState<ISetting>(settingState);
  const { url } = useParams<{ url: string }>();

  useEffect(() => {
    setUpdateSettingState(settingState); // 초기 상태 설정
  }, [settingState]);

  const onSaveSetting = () => {
    if (url && updateSettingState) {
      updateSettingHook(url, updateSettingState); // 수정된 상태 전송 및 리덕스 업데이트
    }
    setIsModifiable(false); // 수정 불가 상태로 변경
  };

  const handleSettingChange = (field: string, value: any) => {
    console.log('handleSettingChange', field, value);
    setUpdateSettingState((prevState) => ({
      ...prevState,
      colorSetting: {
        ...prevState.colorSetting,
        [field]: value,
      },
    }));
    setIsModifiable(true);
  };

  return (
    <ScrollZone style={{ height: 'calc((100vh - 102px) / 2)' }}>
      <Scrollbars>
        <ContentLine style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div></div>
          <div style={{ display: 'inline-flex', gap: '10px' }}>
            {isModifiable && <CustomTextButton onClick={() => onSaveSetting()}>Save</CustomTextButton>}
          </div>
        </ContentLine>
        <Section>
          <ColorSetting colorSetting={updateSettingState.colorSetting} handleSettingChange={handleSettingChange} />
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
