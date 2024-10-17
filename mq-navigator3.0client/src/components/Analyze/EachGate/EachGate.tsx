import React from 'react';
import {
  Content,
  ContentLine,
  ContentLineInput,
  ContentLineText,
  CustomIconButton,
  SelectOption,
} from '@components/PlayList/styles';
import '../../../index.css';

interface EachGateProps {
  number?: number;
}

const EachGate = ({ number }: EachGateProps) => {
  return (
    <Content>
      <ContentLine>
        <ContentLineText className="width70px">{number}</ContentLineText>
        <ContentLineInput className="width120px">1111 1111</ContentLineInput>
        <SelectOption className="width50px">
          <option value="north" selected>
            N
          </option>
          <option value="south">S</option>
        </SelectOption>
        <ContentLineInput className="flex">37.0</ContentLineInput>
        <SelectOption className="width50px">
          <option value="east" selected>
            E
          </option>
          <option value="west">W</option>
        </SelectOption>
        <ContentLineInput className="flex">37.0</ContentLineInput>
        <CustomIconButton>
          <i className="fa-solid fa-xmark"></i>
        </CustomIconButton>
      </ContentLine>
    </Content>
  );
};

export default EachGate;
