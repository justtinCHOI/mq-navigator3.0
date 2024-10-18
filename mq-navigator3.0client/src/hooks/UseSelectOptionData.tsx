import React from 'react';
import { SelectOption } from '@components/Playbar/styles';

const UseSelectOptionData = () => {
  return (
    <SelectOption className="width220px">
      <option value="DISTANCE" selected>
        distance
      </option>
      <option value="ELAPSED_TIME">elapsed time</option>
      <option value="ESTIMATED_TIME">estimated time</option>
      <option value="ELAPSED_SPEED">elapsed speed</option>
      <option value="ESTIMATED_SPEED">estimated speed</option>
    </SelectOption>
  );
};

export default UseSelectOptionData;
