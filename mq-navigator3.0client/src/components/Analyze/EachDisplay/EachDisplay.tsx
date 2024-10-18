import React from 'react';
import { Content, ContentLine, ContentLineText } from '@components/Playbar/styles';

const EachDisplay = () => {
  return (
    <Content>
      <ContentLine>
        <ContentLineText className="width100px">first ~ current</ContentLineText>
        <ContentLineText className="flex">2900</ContentLineText>
        <ContentLineText className="flex">252700</ContentLineText>
        <ContentLineText className="flex">252700</ContentLineText>
        <ContentLineText className="flex">1</ContentLineText>
      </ContentLine>
    </Content>
  );
};

export default EachDisplay;
