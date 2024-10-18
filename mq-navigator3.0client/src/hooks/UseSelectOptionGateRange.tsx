import React from 'react';
import { ContentLine, ContentLineText, SelectOption } from '@components/PlayList/styles';
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
