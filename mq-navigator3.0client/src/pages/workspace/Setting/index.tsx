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
import { IRoute, ISetting, IWorkspace } from '@typings/db';
import useCustomSetting from '@hooks/useCustomSetting';
import { useParams } from 'react-router';
import useCustomWorkspace from '@hooks/useCustomWorkspace';

const Setting = () => {
  const { settingState, updateSettingHook } = useCustomSetting();
  const [isModifiable, setIsModifiable] = useState<boolean>(false);
  const [updateSettingState, setUpdateSettingState] = useState<ISetting>(settingState);
  const { url } = useParams<{ url: string }>();
  const { workspaceState, updateWorkspaceHook } = useCustomWorkspace();
  const [updateRoutesState, setUpdateRoutesState] = useState<IRoute[]>(workspaceState.routes);

  useEffect(() => {
    setUpdateSettingState(settingState); // 초기 상태 설정
  }, [settingState]);

  useEffect(() => {
    setUpdateRoutesState(updateRoutesState); // 초기 상태 설정
  }, [updateRoutesState, workspaceState.routes]);

  const onSaveSetting = () => {
    if (url && updateSettingState) {
      updateSettingHook(url, updateSettingState); // 수정된 상태 전송 및 리덕스 업데이트
      const newWorkspace: IWorkspace = { ...workspaceState, routes: updateRoutesState };
      updateWorkspaceHook(newWorkspace);
    }
    setIsModifiable(false); // 수정 불가 상태로 변경
  };

  const handleColorSettingChange = (field: string, value: any) => {
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

  const handleRefreshIntervalSetting = (value: any) => {
    console.log('handleRefreshIntervalSetting', value);
    setUpdateSettingState((prevState) => ({
      ...prevState,
      refreshInterval: value,
    }));
    setIsModifiable(true);
  };

  const handleToleranceRangeSetting = (value: any) => {
    console.log('handleToleranceRangeSetting', value);
    setUpdateSettingState((prevState) => ({
      ...prevState,
      toleranceRange: value,
    }));
    setIsModifiable(true);
  };

  const handleSpeedPredictionIntervalSetting = (value: any) => {
    console.log('handleSpeedPredictionIntervalSetting', value);
    setUpdateSettingState((prevState) => ({
      ...prevState,
      speedPredictionInterval: value,
    }));
    setIsModifiable(true);
  };

  const handleRouteSetting = (index: number, updatedRouteName: string) => {
    setUpdateRoutesState((prev) =>
      prev.map((route, i) =>
        i === index
          ? {
              ...route,
              name: updatedRouteName,
            }
          : route,
      ),
    );
    setIsModifiable(true);
  };

  const handleDisplaySectionSettingChange = (index: number, field: string, value: any) => {
    console.log('handleDisplaySectionSettingChange', field, value);

    // 새로운 배열로 복사
    const newDisplaySections = updateSettingState.displaySections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section,
    );

    // updateSettingState 업데이트
    setUpdateSettingState((prevState) => ({
      ...prevState,
      displaySections: newDisplaySections,
    }));
    setIsModifiable(true);
  };

  const handleSectionDataSettingChange = (index: number, value: any) => {
    console.log('handleDisplaySectionSettingChange', value);

    // 새로운 배열로 복사
    const newSectionDatas = updateSettingState.sectionDatas.map((data, i) => (i === index ? value : data));

    // updateSettingState 업데이트
    setUpdateSettingState((prevState) => ({
      ...prevState,
      sectionDatas: newSectionDatas,
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
          <ColorSetting colorSetting={updateSettingState.colorSetting} handleSettingChange={handleColorSettingChange} />
        </Section>
        <Section>
          <RefreshIntervalSetting
            refreshInterval={updateSettingState.refreshInterval}
            handleSettingChange={handleRefreshIntervalSetting}
          />
        </Section>
        <Section>
          <ToleranceRangeSetting
            toleranceRange={updateSettingState.toleranceRange}
            handleSettingChange={handleToleranceRangeSetting}
          />
        </Section>
        <Section>
          <SpeedPredictionIntervalSetting
            speedPredictionInterval={updateSettingState.speedPredictionInterval}
            handleSettingChange={handleSpeedPredictionIntervalSetting}
          />
        </Section>
        <Section>
          <RouteSetting routes={updateRoutesState} handleSettingChange={handleRouteSetting} />
        </Section>
        <Section>
          <DisplaySectionSetting
            displaySections={updateSettingState.displaySections}
            handleSettingChange={handleDisplaySectionSettingChange}
          />
        </Section>
        <Section>
          <SectionDataSetting
            sectionDatas={updateSettingState.sectionDatas}
            handleSettingChange={handleSectionDataSettingChange}
          />
        </Section>
      </Scrollbars>
    </ScrollZone>
  );
};

export default Setting;
