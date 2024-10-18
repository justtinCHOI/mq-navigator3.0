import React from 'react';
import { SelectOption } from '@components/PlayList/styles';

const UseSelectOptionGate = () => {
  return (
    <SelectOption className="width300px">
      <option value="firstGate" selected>
        first gate
      </option>
      <option value="lastGate">last gate</option>
      <option value="previousGateBasedOnSelected">previous gate based on selected</option>
      <option value="latestGateBasedOnSelected">latest gate based on selected</option>
      <option value="nextGateBasedOnSelected">next gate based on selected</option>
      <option value="previousGateBasedOnCurrent">previous gate based on current</option>
      <option value="latestGateBasedOnCurrent">latest gate based on current</option>
      <option value="nextGateBasedOnCurrent">next gate based on current</option>
    </SelectOption>
  );
};

export default UseSelectOptionGate;
