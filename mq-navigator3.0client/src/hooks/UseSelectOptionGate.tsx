import React from 'react';
import { SelectOption } from '@components/Playbar/styles';
import { Location } from '@typings/db';

interface UseSelectOptionGateProps {
  selectedLocation: Location;
  handleSettingChange: (value: string) => void;
}

const UseSelectOptionGate: React.FC<UseSelectOptionGateProps> = ({ selectedLocation, handleSettingChange }) => {
  const changeLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSettingChange(e.target.value as Location);
  };

  return (
    <SelectOption className="width300px" value={selectedLocation} onChange={changeLocation}>
      <option value={Location.FIRST_GATE}>first gate</option>
      <option value={Location.LAST_GATE}>last gate</option>
      <option value={Location.PREVIOUS_GATE_BASED_ON_SELECTED}>previous gate based on selected</option>
      <option value={Location.LATEST_GATE_BASED_ON_SELECTED}>latest gate based on selected</option>
      <option value={Location.NEXT_GATE_BASED_ON_SELECTED}>next gate based on selected</option>
      <option value={Location.PREVIOUS_GATE_BASED_ON_CURRENT}>previous gate based on current</option>
      <option value={Location.LATEST_GATE_BASED_ON_CURRENT}>latest gate based on current</option>
      <option value={Location.NEXT_GATE_BASED_ON_CURRENT}>next gate based on current</option>
    </SelectOption>
  );
};

export default UseSelectOptionGate;
