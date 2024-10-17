import React from 'react';
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
} from '@components/PlayList/styles';
import '../../../index.css';

const GateList = () => {
  return (
    <Content style={{ height: 'calc((100vh - 136px) / 2)' }}>
      <Content style={{ height: '120px' }}>
        <ContentLine style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <SelectOption style={{ margin: '0 auto' }}>
            <option value="Route011" selected>
              Route011
            </option>
            <option value="Route012" selected>
              Route012
            </option>
            <option value="Route013" selected>
              Route013
            </option>
            <option value="Route014" selected>
              Route014
            </option>
          </SelectOption>
          <div style={{ display: 'inline-flex', gap: '10px' }}>
            <CustomTextButton>Save</CustomTextButton>
            <CustomTextButton>Modify</CustomTextButton>
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
        </ContentLine>
      </Content>
      <ScrollZone style={{ height: 'calc((100vh - 136px) / 2) - 120px' }}>
        <Scrollbars>
          {Array.from({ length: 10 }, (_, index) => (
            <EachGate key={index + 1} number={index + 1} />
          ))}
        </Scrollbars>
      </ScrollZone>
    </Content>
  );
};

export default GateList;
