import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { ScrollZone } from '@pages/workspace/Analyze/styles';
import '../../../index.css';
import { Content, ContentLine, ContentLineText } from '@components/Playbar/styles';
import EachDisplay from '@components/Analyze/EachDisplay/EachDisplay';
import useCustomSetting from '@hooks/useCustomSetting';
const DisplayList = () => {
  const { settingState } = useCustomSetting();
  const { displaySections, sectionDatas, speedPredictionInterval } = settingState;

  return (
    <Content style={{ height: 'calc((100vh - 126px) / 2)' }}>
      <Content style={{ height: '60px' }}>
        <ContentLine>
          <ContentLineText className="width300px">Gate Range</ContentLineText>
          <ContentLineText className="flex">
            Distance
            <br />
            (m)
          </ContentLineText>
          <ContentLineText className="flex">
            Elasped Time
            <br />
            (hhmmss)
          </ContentLineText>
          <ContentLineText className="flex">
            Estimated Time
            <br />
            (hhmmss)
          </ContentLineText>
          <ContentLineText className="flex">
            Elasped Speed
            <br />
            (km/h)
          </ContentLineText>
          <ContentLineText className="flex">
            Estimated Speed
            <br />
            (km/h)
          </ContentLineText>
        </ContentLine>
      </Content>
      <ScrollZone style={{ height: 'calc((100vh - 126px) / 2) - 60px' }}>
        <Scrollbars>
          {displaySections.map((displaySection, index) => (
            <EachDisplay
              key={index + 1}
              start={displaySection.start}
              end={displaySection.end}
              sectionDatas={sectionDatas}
              speedPredictionInterval={speedPredictionInterval}
            />
          ))}
        </Scrollbars>
      </ScrollZone>
    </Content>
  );
};

export default DisplayList;
