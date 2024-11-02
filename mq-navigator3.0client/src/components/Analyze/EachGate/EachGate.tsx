import React, {useEffect, useState} from 'react';
import {
  Content,
  ContentLine,
  ContentLineInput,
  ContentLineText,
  CustomIconButton,
  SelectOption,
} from '@components/Playbar/styles';
import '../../../index.css';
import { NullableIGate } from '@typings/db';
import { dateToString, stringToDate } from '@utils/dateUtil';

interface EachGateProps {
  gateState: NullableIGate;
  keyValue: number;
  isModify: boolean; // 수정 가능 상태를 외부로부터 전달받음
  onGateChange: (updatedGate: NullableIGate) => void;
}

const EachGate: React.FC<EachGateProps> = ({ gateState, keyValue, isModify, onGateChange }) => {
  // const [id, setId] = useState(gateState.id);
  // const [sequence, setSequence] = useState(gateState.sequence);
  const [time, setTime] = useState<string | null>(gateState.time ? dateToString(new Date(gateState.time)) : null);
  const [latitude, setLatitude] = useState<number | null>(gateState.coordinate ? gateState.coordinate.latitude : null);
  const [longitude, setLongitude] = useState<number | null>(
    gateState.coordinate ? gateState.coordinate.longitude : null,
  );
  const [latDirection, setLatDirection] = useState<string | null>(
    gateState.coordinate?.latitude ? (gateState.coordinate.latitude >= 0 ? 'north' : 'south') : null,
  );
  const [longDirection, setLongDirection] = useState<string | null>(
    gateState.coordinate?.longitude ? (gateState.coordinate.longitude >= 0 ? 'east' : 'west') : null,
  );

  useEffect(() => {
    setTime(gateState.time ? dateToString(new Date(gateState.time)) : null);
    setLatitude(gateState.coordinate ? gateState.coordinate.latitude : null);
    setLongitude(gateState.coordinate ? gateState.coordinate.longitude : null);
    if (gateState.coordinate?.latitude !== null && gateState.coordinate?.latitude !== undefined) {
      setLatDirection(gateState.coordinate.latitude >= 0 ? 'north' : 'south');
    }

    if (gateState.coordinate?.longitude !== null && gateState.coordinate?.longitude !== undefined) {
      setLongDirection(gateState.coordinate.longitude >= 0 ? 'east' : 'west');
    }
  }, [gateState]);

  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newLatitude = Number(e.target.value);
    if (latDirection == 'south') {
      newLatitude = -1 * Math.abs(newLatitude);
    }
    setLatitude(newLatitude);
    onGateChange({
      ...gateState,
      coordinate: {
        ...gateState.coordinate,
        latitude: newLatitude,
        longitude: gateState.coordinate?.longitude ?? null,
      },
    });
  };

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newLongitude = Number(e.target.value);
    if (longDirection == 'west') {
      newLongitude = -1 * Math.abs(newLongitude);
    }
    setLongitude(newLongitude);
    onGateChange({
      ...gateState,
      coordinate: {
        ...gateState.coordinate,
        longitude: newLongitude,
        latitude: gateState.coordinate?.latitude ?? null,
      },
    });
  };

  const handleLatDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLatDirection(e.target.value);
    let newLatitude = latitude;
    if (longDirection == 'south' && newLatitude) {
      newLatitude = -1 * Math.abs(newLatitude);
    }
    setLatitude(newLatitude);
    onGateChange({
      ...gateState,
      coordinate: {
        ...gateState.coordinate,
        latitude: newLatitude,
        longitude: gateState.coordinate?.longitude ?? null,
      },
    });
  };

  const handleLongDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLongDirection(e.target.value);
    let newLongitude = longitude;
    if (longDirection == 'south' && newLongitude) {
      newLongitude = -1 * Math.abs(newLongitude);
    }
    setLatitude(newLongitude);
    onGateChange({
      ...gateState,
      coordinate: {
        ...gateState.coordinate,
        longitude: newLongitude,
        latitude: gateState.coordinate?.latitude ?? null,
      },
    });
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
          value={time || 'null'}
          onChange={handleTimeChange}
          disabled={!isModify}
        />
        {/* Latitude Direction */}
        <SelectOption
          className="width50px"
          value={latitude !== null ? Math.abs(latitude) : ''}
          onChange={handleLatDirectionChange}
          disabled={!isModify}
        >
          <option value="north">N</option>
          <option value="south">S</option>
        </SelectOption>

        {/* Latitude */}
        <ContentLineInput
          className="flex"
          value={longitude !== null ? Math.abs(longitude) : ''}
          onChange={handleLatitudeChange}
          disabled={!isModify}
        />

        {/* Longitude Direction */}
        <SelectOption
          className="width50px"
          defaultValue={longDirection || 'null'}
          onChange={handleLongDirectionChange}
          disabled={!isModify}
        >
          <option value="east">E</option>
          <option value="west">W</option>
        </SelectOption>

        {/* Longitude */}
        <ContentLineInput
          className="flex"
          defaultValue={longitude ? Math.abs(longitude) : 'null'}
          onChange={handleLongitudeChange}
          disabled={!isModify}
        />
        <CustomIconButton>
          <i className="fa-solid fa-xmark"></i>
        </CustomIconButton>
      </ContentLine>
    </Content>
  );
};

export default EachGate;
