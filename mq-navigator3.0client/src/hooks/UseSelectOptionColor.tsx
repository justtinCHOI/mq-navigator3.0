import React from 'react';
import { ContentLine, ContentLineText, SelectOption } from '@components/PlayList/styles';

// 함수형 컴포넌트로 정의
const UseSelectOptionColor = ({ phase }: { phase: string }) => {
  return (
    <ContentLine>
      <ContentLineText style={{ width: '200px' }}>{phase}</ContentLineText>
      <SelectOption className="width140px">
        <option value="SKYBLUE" selected>
          Sky Blue
        </option>
        <option value="PURPLE">Purple</option>
        <option value="YELLOW">Yellow</option>
        <option value="LIGHTGREEN">Light Green</option>
      </SelectOption>
    </ContentLine>
  );
};

export default UseSelectOptionColor;
