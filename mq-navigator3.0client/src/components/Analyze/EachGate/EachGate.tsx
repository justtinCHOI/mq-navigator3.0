import React, { useState } from 'react';
import {
  Content,
  ContentLine,
  ContentLineInput,
  ContentLineText,
  CustomIconButton,
  SelectOption,
} from '@components/Playbar/styles';
import '../../../index.css';
import { IGate } from '@typings/db';
import {dateToString, stringToDate} from '@utils/dateUtil';

interface EachGateProps {
  gateState: IGate;
  keyValue: number;
  isModify: boolean; // 수정 가능 상태를 외부로부터 전달받음
  onGateChange: (updatedGate: IGate) => void;
}

const EachGate: React.FC<EachGateProps> = ({ gateState, keyValue, isModify, onGateChange }) => {
  // const [id, setId] = useState(gateState.id);
  // const [sequence, setSequence] = useState(gateState.sequence);
  const [time, setTime] = useState(gateState.time);
  const [latitude, setLatitude] = useState(gateState.coordinate.latitude);
  const [longitude, setLongitude] = useState(gateState.coordinate.longitude);
  const [latDirection, setLatDirection] = useState(gateState.coordinate.latitude >= 0 ? 'north' : 'south');
  const [longDirection, setLongDirection] = useState(gateState.coordinate.longitude >= 0 ? 'east' : 'west');

  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newLatitude = Number(e.target.value);
    if (latDirection == 'south') {
      newLatitude = -1 * newLatitude;
    }
    setLatitude(newLatitude);
    onGateChange({ ...gateState, coordinate: { ...gateState.coordinate, latitude: latitude } });
  };

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newLongitude = Number(e.target.value);
    if (longDirection == 'west') {
      newLongitude = -1 * newLongitude;
    }
    setLongitude(newLongitude);
    onGateChange({ ...gateState, coordinate: { ...gateState.coordinate, longitude: longitude } });
  };

  const handleLatDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLatDirection(e.target.value);
    if (longDirection == 'south') {
      setLatitude(-1 * latitude);
      onGateChange({ ...gateState, coordinate: { ...gateState.coordinate, latitude: latitude } });
    }
  };

  const handleLongDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLongDirection(e.target.value);
    if (longDirection == 'south') {
      setLatitude(-1 * latitude);
      onGateChange({ ...gateState, coordinate: { ...gateState.coordinate, longitude: longitude } });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = stringToDate(e.target.value);
    setTime(newTime.toISOString());
    onGateChange({ ...gateState, time: newTime.toISOString() });
  };

  return (
    <Content>
      <ContentLine>
        <ContentLineText className="width70px">{keyValue}</ContentLineText>
        <ContentLineInput
          className="width120px"
          defaultValue={dateToString(new Date(gateState.time))}
          onChange={handleTimeChange}
          disabled={!isModify}
        />
        {/* Latitude Direction */}
        <SelectOption
          className="width50px"
          value={latDirection}
          onChange={handleLatDirectionChange}
          disabled={!isModify}
        >
          <option value="north">N</option>
          <option value="south">S</option>
        </SelectOption>

        {/* Latitude */}
        <ContentLineInput className="flex" value={latitude} onChange={handleLatitudeChange} disabled={!isModify} />

        {/* Longitude Direction */}
        <SelectOption
          className="width50px"
          value={longDirection}
          onChange={handleLongDirectionChange}
          disabled={!isModify}
        >
          <option value="east">E</option>
          <option value="west">W</option>
        </SelectOption>

        {/* Longitude */}
        <ContentLineInput className="flex" value={longitude} onChange={handleLongitudeChange} disabled={!isModify} />
        <CustomIconButton>
          <i className="fa-solid fa-xmark"></i>
        </CustomIconButton>
      </ContentLine>
    </Content>
  );
};

export default EachGate;
