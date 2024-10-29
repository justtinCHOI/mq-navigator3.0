import React from 'react';
import { ContentLine, ContentLineText } from '@components/Playbar/styles';
import UseSelectOptionGate from '@hooks/UseSelectOptionGate';
import { DisplaySection } from '@typings/db';

interface UseSelectOptionGateRangeProps {
  displaySection: DisplaySection;
  handleSettingChange: (field: string, value: string) => void;
}

const UseSelectOptionGateRange: React.FC<UseSelectOptionGateRangeProps> = ({ displaySection, handleSettingChange }) => {
  return (
    <ContentLine>
      <UseSelectOptionGate
        selectedLocation={displaySection.start}
        handleSettingChange={(value) => handleSettingChange('start', value)}
      />
      <ContentLineText style={{ width: '50px' }}>~</ContentLineText>
      <UseSelectOptionGate
        selectedLocation={displaySection.end}
        handleSettingChange={(value) => handleSettingChange('end', value)}
      />
    </ContentLine>
  );
};

export default UseSelectOptionGateRange;
