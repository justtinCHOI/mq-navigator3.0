import React from 'react';
import {
  Content,
  ContentLine,
  ContentLineInput,
  ContentLineText,
  CustomIconButton,
  SelectOption,
} from '@components/Playbar/styles';
import '../../../index.css';

interface EachGateProps {
  number?: number;
}

const EachGate = ({ number }: EachGateProps) => {
  return (
    <Content>
      <ContentLine>
        <ContentLineText className="width70px">{number}</ContentLineText>
        <ContentLineInput className="width120px" defaultValue="1111 1111" />
        <SelectOption className="width50px">
          <option value="north" selected>
            N
          </option>
          <option value="south">S</option>
        </SelectOption>
        <ContentLineInput className="flex" defaultValue="37.0" />
        <SelectOption className="width50px">
          <option value="east" selected>
            E
          </option>
          <option value="west">W</option>
        </SelectOption>
        <ContentLineInput className="flex" defaultValue="37.0" />
        <CustomIconButton>
          <i className="fa-solid fa-xmark"></i>
        </CustomIconButton>
      </ContentLine>
    </Content>
  );
};

export default EachGate;
