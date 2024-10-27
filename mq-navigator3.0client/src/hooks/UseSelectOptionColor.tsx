import React from 'react';
import { ContentLine, ContentLineText, SelectOption } from '@components/Playbar/styles';
import { Color } from '@typings/db';

interface UseSelectOptionColorProps {
  phase: string;
  selectedColor: Color;
  handleSettingChange: (field: string, value: Color) => void;
}

const UseSelectOptionColor: React.FC<UseSelectOptionColorProps> = ({ phase, selectedColor, handleSettingChange }) => {
  const onChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSettingChange(phase, e.target.value as Color);
  };

  return (
    <ContentLine>
      <ContentLineText style={{ width: '200px' }}>{phase}</ContentLineText>
      <SelectOption className="width140px" value={selectedColor} onChange={onChangeColor}>
        <option value={Color.SKY_BLUE}>Sky Blue</option>
        <option value={Color.PURPLE}>Purple</option>
        <option value={Color.YELLOW}>Yellow</option>
        <option value={Color.LIGHT_GREEN}>Light Green</option>
      </SelectOption>
    </ContentLine>
  );
};

export default UseSelectOptionColor;
