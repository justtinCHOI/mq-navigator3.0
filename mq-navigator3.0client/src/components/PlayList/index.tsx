import React from 'react';
import {
  PlayListContainer,
  ContentLine,
  ContentLineDiv,
  RightContentIcon,
  SelectOption,
  ProgressBar,
  TimeDisplay,
  ProgressContainer,
} from '@components/PlayList/styles';

const PlayList = () => (
  <PlayListContainer>
    <ContentLine>
      <ContentLineDiv></ContentLineDiv>
      <RightContentIcon className="fa-solid fa-backward"></RightContentIcon>
      <RightContentIcon className="fa-solid fa-pause"></RightContentIcon>
      <RightContentIcon className="fa-solid fa-play"></RightContentIcon>
      <RightContentIcon className="fa-solid fa-forward"></RightContentIcon>
      <SelectOption id="speedSelector">
        <option value="1/4">X 0.25</option>
        <option value="1/2">X 0.5</option>
        <option value="1" selected>
          X 1.0
        </option>
        <option value="2">X 2.0</option>
        <option value="4">X 4.0</option>
      </SelectOption>
    </ContentLine>
    <ContentLine>
      <ContentLineDiv className="flex width100">
        <ProgressContainer>
          <ProgressBar type="range" value="0" max="100" />
          <TimeDisplay>
            <span id="currentTime">0:00</span> / <span id="totalTime">5:00</span>
          </TimeDisplay>
        </ProgressContainer>
      </ContentLineDiv>
    </ContentLine>
  </PlayListContainer>
);

export default PlayList;
