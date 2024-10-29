import React from 'react';
import { SelectOption } from '@components/Playbar/styles';
import { SectionData } from '@typings/db';

interface UseSelectOptionDataProps {
  sectionData: SectionData;
  handleSettingChange: (value: string) => void;
}

const UseSelectOptionData: React.FC<UseSelectOptionDataProps> = ({ sectionData, handleSettingChange }) => {
  const changeSectionData = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSettingChange(e.target.value as SectionData);
  };

  return (
    <SelectOption className="width220px" value={sectionData} onChange={changeSectionData}>
      <option value={SectionData.DISTANCE}>distance</option>
      <option value={SectionData.ELAPSED_TIME}>elapsed time</option>
      <option value={SectionData.ESTIMATED_TIME}>estimated time</option>
      <option value={SectionData.ELAPSED_SPEED}>elapsed speed</option>
      <option value={SectionData.ESTIMATED_SPEED}>estimated speed</option>
    </SelectOption>
  );
};

export default UseSelectOptionData;
