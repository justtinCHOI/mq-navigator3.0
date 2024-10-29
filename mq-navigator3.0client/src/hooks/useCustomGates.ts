import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { updateGatesAsync } from '@slices/gatesSlice';
import { Coordinate, IGate } from '@typings/db';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { calculateDistance } from '@utils/physicsUtil';

function UseCustomGates() {
  const dispatch: AppDispatch = useDispatch();
  const gatesState = useSelector((state: RootState) => state.gatesSlice);
  const { url } = useParams<{ url: string }>();
  const [isDistanceCalculated, setIsDistanceCalculated] = useState(false);

  // traveledDistance를 채워 넣는 useEffect
  useEffect(() => {
    // 이미 traveledDistance가 계산된 경우 실행하지 않음
    if (isDistanceCalculated || gatesState.every((gate) => gate.traveledDistance !== undefined)) {
      return;
    }

    let accumulatedDistance = 0;
    const updatedGates = gatesState.map((gate, index) => {
      if (index === 0) {
        console.log('updateTravledDistance', index, accumulatedDistance);
        return { ...gate, traveledDistance: 0 };
      } else {
        const prevGate = gatesState[index - 1];
        const distance = calculateDistance(prevGate.coordinate, gate.coordinate);
        accumulatedDistance += distance;
        console.log('updateTravledDistance', index, accumulatedDistance);
        return { ...gate, traveledDistance: accumulatedDistance };
      }
    });

    // 상태를 업데이트하고 업데이트가 완료되면 반복 방지를 위해 flag를 설정
    if (url && updatedGates.length > 0) {
      dispatch(updateGatesAsync({ url, gates: updatedGates })).then(() => {
        setIsDistanceCalculated(true);
      });
    }
  }, [gatesState, url, dispatch, isDistanceCalculated]);

  function updateGatesWithIndex(index: number, newCoordinate: Coordinate) {
    // 상태의 복사본 생성 및 업데이트
    const updatedGates = [...gatesState];
    updatedGates[index] = {
      ...updatedGates[index],
      coordinate: newCoordinate,
    };
    if (url) {
      dispatch(updateGatesAsync({ url, gates: updatedGates }));
    }
  }

  function updateGatesHook(url: string, updateGates: IGate[]) {
    dispatch(updateGatesAsync({ url, gates: updateGates }));
  }
  return { gatesState, updateGatesWithIndex, updateGatesHook };
}

export default UseCustomGates;
