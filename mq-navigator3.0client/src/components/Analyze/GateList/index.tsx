import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { ScrollZone } from '@pages/workspace/Analyze/styles';
import EachGate from '@components/Analyze/EachGate/EachGate';
import {
  Content,
  ContentLine,
  ContentLineText,
  CustomIconButton,
  CustomTextButton,
  SelectOption,
} from '@components/Playbar/styles';
import '../../../index.css';
import { Location, NullableIGate } from '@typings/db';
import { useParams } from 'react-router';
import useCustomGates from '@hooks/useCustomGates';
import useCustomWorkspace from '@hooks/useCustomWorkspace';

const GateList = () => {
  const { gatesState, updateGatesHook } = useCustomGates();
  const { workspaceState } = useCustomWorkspace();
  const { routes, route } = workspaceState;
  const [updateGatesState, setUpdateGatesState] = useState<NullableIGate[]>([]);
  const [isModify, setIsModify] = useState<boolean>(false);
  const { url } = useParams<{ url: string }>();

  useEffect(() => {
    setUpdateGatesState(gatesState); // 초기 상태 설정
  }, [gatesState]);

  const onChangeToModify = () => setIsModify(true);

  function onSaveGateList() {
    if (url) {
      updateGatesHook(url, updateGatesState); // 수정된 상태 전송 및 리덕스 업데이트
    }
    setIsModify(false); // 수정 불가 상태로 변경
  }

  const handleGateChange = (index: number, updatedGate: NullableIGate) => {
    setUpdateGatesState((prev) => prev.map((gate, i) => (i === index ? updatedGate : gate)));
  };

  const changeRoutes = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSettingChange(e.target.value as Location);
  };

  return (
    <Content style={{ height: 'calc((100vh - 126px) / 2)' }}>
      <Content style={{ height: '120px' }}>
        <ContentLine style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <SelectOption style={{ margin: '0 auto' }} value={'Route011'} onChange={changeRoutes} disabled={!isModify}>
            <option value="Route011">Route011</option>
            <option value="Route012">Route012</option>
            <option value="Route013">Route013</option>
            <option value="Route014">Route014</option>
            {routes.map((route, index) => (
              <option key={index} value={route.id}>
                {route.name}
              </option>
            ))}
          </SelectOption>
          <div style={{ display: 'inline-flex', gap: '10px' }}>
            {isModify ? (
              <CustomTextButton onClick={() => onSaveGateList()}>Save</CustomTextButton>
            ) : (
              <CustomTextButton onClick={() => onChangeToModify()}>Modify</CustomTextButton>
            )}
          </div>
        </ContentLine>
        <ContentLine>
          <ContentLineText className="width70px">
            Gate
            <br />
            Number
          </ContentLineText>
          <ContentLineText className="width120px">
            Time
            <br />
            MMDD hhmmss
          </ContentLineText>
          <ContentLineText className="flex">Latitude</ContentLineText>
          <ContentLineText className="flex">Longitude</ContentLineText>
          <CustomIconButton style={{ visibility: 'hidden' }}>X</CustomIconButton>
          <div className="width6px"></div>
        </ContentLine>
      </Content>
      <ScrollZone style={{ height: 'calc((100vh - 126px) / 2) - 120px' }}>
        <Scrollbars>
          {gatesState.map((gateState, index) => (
            <EachGate
              key={index + 1}
              keyValue={index + 1}
              gateState={gateState}
              isModify={isModify}
              onGateChange={(updatedGate) => handleGateChange(index, updatedGate)}
            />
          ))}
        </Scrollbars>
      </ScrollZone>
    </Content>
  );
};

export default GateList;
