import React from 'react';
import { ContentLine, ContentLineText, SelectOption } from '@components/PlayList/styles';

// 함수형 컴포넌트로 정의
const UseSelectOptionColor = ({ phase }: { phase: string }) => {
  return (
    <ContentLine>
      <ContentLineText style={{ width: '200px' }}>{phase}</ContentLineText>
      <SelectOption className="width140px">
        <option value="SkyBlue" selected>
          Sky Blue
        </option>
        <option value="Purple">Purple</option>
        <option value="Yellow">Yellow</option>
        <option value="LightGreen">Light Green</option>
      </SelectOption>
    </ContentLine>
  );
};

export default UseSelectOptionColor;
