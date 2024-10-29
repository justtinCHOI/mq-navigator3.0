import { Coordinate, IGate } from '@typings/db';
import useCustomGates from '@hooks/useCustomGates';

// 두 좌표 간 거리 계산 함수 (피타고라스 정리 사용)
export function calculateDistance(coord1: Coordinate, coord2: Coordinate) {
  const xDiff = coord2.latitude - coord1.latitude;
  const yDiff = coord2.longitude - coord1.longitude;
  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

// `selectedTime`에 맞는 `selectedPoint`를 계산하는 함수
export function transformTimeToPoint(selectedTime: string) {
  const { forwardGateWithTime, backwardGateWithTime } = FindForwardAndBackwardGateWithTime(selectedTime);
  if (forwardGateWithTime === null || backwardGateWithTime === null) {
    return null;
  }
  const selectedTraveledDistance = findTraveledDistanceWithForwardAndBackwardGateAndTime(
    forwardGateWithTime,
    backwardGateWithTime,
    selectedTime,
  );
  const { forwardGateWithTraveledDistance, backwardGateWithTraveledDistance } =
    FindForwardAndBackwardGateWithTraveledDistance(selectedTraveledDistance);

  if (forwardGateWithTraveledDistance === null || backwardGateWithTraveledDistance === null) {
    return null;
  }

  const selectedCoordinate = FindTraveledCoordinateWithForwardAndBackwardGateAndTraveledDistance(
    forwardGateWithTraveledDistance,
    backwardGateWithTraveledDistance,
    selectedTraveledDistance,
  );

  return {
    id: 0,
    sequence: 0,
    time: selectedTime,
    coordinate: selectedCoordinate,
    traveledDistance: selectedTraveledDistance,
  };
}

// `selectedPoint`에 맞는 `selectedTime`을 계산하는 함수
export function transformPointToTime(selectedPoint: IGate | null) {
  if (selectedPoint == null) {
    return '';
  }
  const selectedTraveledDistance = selectedPoint.traveledDistance;
  const { timeExistedForwardGateWithTraveledDistance, timeExistedBackwardGateWithTraveledDistance } =
    FindTimeExistedForwardAndBackwardGateWithTraveledDistance(selectedTraveledDistance);

  if (timeExistedForwardGateWithTraveledDistance === null || timeExistedBackwardGateWithTraveledDistance === null) {
    return '';
  }
  return findTimeWithForwardAndBackwardGateAndTime(
    timeExistedForwardGateWithTraveledDistance,
    timeExistedBackwardGateWithTraveledDistance,
    selectedTraveledDistance,
  );
}

// `selectedTime`에 근접한 forward/backward 게이트 찾기
export function FindForwardAndBackwardGateWithTime(selectedTime: string) {
  let forwardGate = null;
  let backwardGate: IGate | null = null;

  const { gatesState } = useCustomGates();

  gatesState.forEach((gate) => {
    if (new Date(gate.time) <= new Date(selectedTime)) {
      forwardGate = gate;
    } else if (!backwardGate) {
      backwardGate = gate;
    }
  });

  return { forwardGateWithTime: forwardGate, backwardGateWithTime: backwardGate };
}

// forward/backward 게이트와 `selectedTime`을 이용해 거리 계산
export function findTraveledDistanceWithForwardAndBackwardGateAndTime(
  forwardGate: IGate,
  backwardGate: IGate,
  selectedTime: string,
) {
  const timeDifference = new Date(backwardGate.time).getTime() - new Date(forwardGate.time).getTime();
  const timeRatio = (new Date(selectedTime).getTime() - new Date(forwardGate.time).getTime()) / timeDifference;
  return forwardGate.traveledDistance + timeRatio * (backwardGate.traveledDistance - forwardGate.traveledDistance);
}

// `selectedTraveledDistance`에 근접한 forward/backward 게이트 찾기
export function FindForwardAndBackwardGateWithTraveledDistance(selectedTraveledDistance: number) {
  let forwardGate = null;
  let backwardGate: IGate | null = null;

  const { gatesState } = useCustomGates();

  gatesState.forEach((gate) => {
    if (gate.traveledDistance <= selectedTraveledDistance) {
      forwardGate = gate;
    } else if (!backwardGate) {
      backwardGate = gate;
    }
  });

  return { forwardGateWithTraveledDistance: forwardGate, backwardGateWithTraveledDistance: backwardGate };
}

// 두 좌표 사이의 중간 좌표를 찾는 함수
export function FindTraveledCoordinateWithForwardAndBackwardGateAndTraveledDistance(
  forwardGate: IGate,
  backwardGate: IGate,
  selectedTraveledDistance: number,
) {
  const traveledDistanceDifference = backwardGate.traveledDistance - forwardGate.traveledDistance;
  const traveledDistanceRatio = (selectedTraveledDistance - forwardGate.traveledDistance) / traveledDistanceDifference;

  const latitude =
    forwardGate.coordinate.latitude +
    traveledDistanceRatio * (backwardGate.coordinate.latitude - forwardGate.coordinate.latitude);
  const longitude =
    forwardGate.coordinate.longitude +
    traveledDistanceRatio * (backwardGate.coordinate.longitude - forwardGate.coordinate.longitude);

  return { latitude, longitude };
}

// 주어진 traveledDistance로 time을 찾는 함수
export function FindTimeExistedForwardAndBackwardGateWithTraveledDistance(selectedTraveledDistance: number) {
  let forwardGate: IGate | null = null;
  let backwardGate: IGate | null = null;

  const { gatesState } = useCustomGates();

  gatesState.forEach((gate) => {
    if (gate.traveledDistance <= selectedTraveledDistance) {
      forwardGate = gate;
    } else if (!backwardGate) {
      backwardGate = gate;
    }
  });

  return {
    timeExistedForwardGateWithTraveledDistance: forwardGate,
    timeExistedBackwardGateWithTraveledDistance: backwardGate,
  };
}

// `selectedTraveledDistance`에 맞는 시간 계산
export function findTimeWithForwardAndBackwardGateAndTime(
  forwardGate: IGate,
  backwardGate: IGate,
  selectedTraveledDistance: number,
) {
  const distanceDifference = backwardGate.traveledDistance - forwardGate.traveledDistance;
  const distanceRatio = (selectedTraveledDistance - forwardGate.traveledDistance) / distanceDifference;

  const forwardTime = new Date(forwardGate.time).getTime();
  const backwardTime = new Date(backwardGate.time).getTime();
  const selectedTime = new Date(forwardTime + distanceRatio * (backwardTime - forwardTime));

  return selectedTime.toISOString();
}
