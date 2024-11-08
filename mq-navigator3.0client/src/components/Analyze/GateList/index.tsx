import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { ScrollZone } from '@pages/workspace/Analyze/styles';
import Index from '@components/Analyze/EachGate';
import {
  Content,
  ContentLine,
  ContentLineText,
  CustomIconButton,
  CustomTextButton,
  SelectOption,
} from '@components/Playbar/styles';
import '../../../index.css';
import { NullableIGate } from '@typings/db';
import { useParams } from 'react-router';
import useCustomGates from '@hooks/useCustomGates';
import useCustomWorkspace from '@hooks/useCustomWorkspace';
import workspace from '@pages/workspace';

const GateList = () => {
  const { gatesState, updateGatesHook } = useCustomGates();
  const { workspaceState, postRouteAsyncHook } = useCustomWorkspace();
  const { routes, route } = workspaceState;
  const [updateGatesState, setUpdateGatesState] = useState<NullableIGate[]>([]);
  const [isModify, setIsModify] = useState<boolean>(false);
  const { url } = useParams<{ url: string }>();

  useEffect(() => {
    setUpdateGatesState(gatesState); // 초기 상태 설정
  }, [gatesState]);

  // routes 배열에 첫 번째 route를 초기값으로 설정 (필요시)
  useEffect(() => {
    if (!workspaceState.route && routes.length > 0) {
      postRouteAsyncHook(routes[0]);
    }
  }, [workspaceState.route, routes, postRouteAsyncHook]);

  const onChangeToModify = () => {
    setIsModify(true);
    console.log('workspaceState.route : ', workspaceState.route);
  };

  function onSaveGateList() {
    if (url) {
      updateGatesHook(url, updateGatesState); // 수정된 상태 전송 및 리덕스 업데이트
    }
    setIsModify(false); // 수정 불가 상태로 변경
  }

  const handleGateChange = (index: number, updatedGate: NullableIGate) => {
    setUpdateGatesState((prev) => prev.map((gate, i) => (i === index ? updatedGate : gate)));
  };

  const changeRoute = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const routeId = e.target.value;

    const selectedRoute = routes.find((route) => route.id.toString() === routeId);

    if (selectedRoute) {
      postRouteAsyncHook(selectedRoute);
    }
  };

  return (
    <Content style={{ height: 'calc((100vh - 126px) / 2)' }}>
      <Content style={{ height: '120px' }}>
        <ContentLine style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <SelectOption
            style={{ margin: '0 auto' }}
            value={workspaceState.route?.id || ''}
            onChange={changeRoute}
            disabled={!isModify}
          >
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
            <Index
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
