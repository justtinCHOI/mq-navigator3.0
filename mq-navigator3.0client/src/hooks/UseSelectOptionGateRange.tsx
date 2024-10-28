import React from 'react';
import { ContentLine, ContentLineText } from '@components/Playbar/styles';
import UseSelectOptionGate from '@hooks/UseSelectOptionGate';

const UseSelectOptionGateRange = () => {
  return (
    <ContentLine>
      <UseSelectOptionGate />
      <ContentLineText style={{ width: '50px' }}>~</ContentLineText>
      <UseSelectOptionGate />
    </ContentLine>
  );
};

export default UseSelectOptionGateRange;
