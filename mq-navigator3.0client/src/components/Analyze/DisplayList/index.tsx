import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { ScrollZone } from '@pages/workspace/Analyze/styles';
import '../../../index.css';
import { Content, ContentLine, ContentLineText } from '@components/PlayList/styles';
import EachDisplay from '@components/Analyze/EachDisplay/EachDisplay';
const DisplayList = () => {
  return (
    <Content style={{ height: 'calc((100vh - 144px) / 2)' }}>
      <Content style={{ height: '60px' }}>
        <ContentLine>
          <ContentLineText className="width70px">Gate Range</ContentLineText>
          <ContentLineText className="width70px">
            Time
            <br />
            (m)
          </ContentLineText>
          <ContentLineText>
            Elasped Time
            <br />
            hhmmss
          </ContentLineText>
          <ContentLineText>
            Estimated Time
            <br />
            hhmmss
          </ContentLineText>
          <ContentLineText>
            Speed
            <br />
            km/h
          </ContentLineText>
        </ContentLine>
      </Content>
      <ScrollZone style={{ height: 'calc((100vh - 144px) / 2) - 60px' }}>
        <Scrollbars>
          {Array.from({ length: 10 }, (_, index) => (
            <EachDisplay key={index + 1} />
          ))}
        </Scrollbars>
      </ScrollZone>
    </Content>
  );
};

export default DisplayList;
