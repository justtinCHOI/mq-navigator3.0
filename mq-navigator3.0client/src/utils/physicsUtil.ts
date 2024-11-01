import { Coordinate, IGate, NullableIGate } from '@typings/db';

// 두 좌표 간 거리 계산 함수 (피타고라스 정리 사용)
export function calculateCoordinate(coord1: Coordinate, coord2: Coordinate) {
  const xDiff = coord2.latitude - coord1.latitude;
  const yDiff = coord2.longitude - coord1.longitude;
  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

// `selectedTime`에 맞는 `selectedPoint`를 계산하는 함수
export function transformTimeToPoint(gatesState: IGate[], selectedTime: string) {
  const { forwardGateWithTime, backwardGateWithTime } = findForwardAndBackwardGateWithTime(gatesState, selectedTime);
  if (forwardGateWithTime === null || backwardGateWithTime === null) {
    return null;
  }
  const selectedTraveledDistance = findTraveledDistanceWithForwardAndBackwardGateAndTime(
    forwardGateWithTime,
    backwardGateWithTime,
    selectedTime,
  );
  const { forwardGateWithTraveledDistance, backwardGateWithTraveledDistance } =
    findForwardAndBackwardGateWithTraveledDistance(gatesState, selectedTraveledDistance);

  if (forwardGateWithTraveledDistance === null || backwardGateWithTraveledDistance === null) {
    return null;
  }

  const selectedCoordinate = findTraveledCoordinateWithForwardAndBackwardGateAndTraveledDistance(
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
export function transformPointToTime(gatesState: IGate[], selectedPoint: NullableIGate | null) {
  if (selectedPoint == null) {
    return null;
  }
  const selectedTraveledDistance = selectedPoint.traveledDistance;
  if (selectedTraveledDistance == null) {
    return null;
  }
  const { timeExistedForwardGateWithTraveledDistance, timeExistedBackwardGateWithTraveledDistance } =
    findTimeExistedForwardAndBackwardGateWithTraveledDistance(gatesState, selectedTraveledDistance);

  if (timeExistedForwardGateWithTraveledDistance === null || timeExistedBackwardGateWithTraveledDistance === null) {
    return '';
  }
  return findTimeWithForwardAndBackwardGateAndTime(
    timeExistedForwardGateWithTraveledDistance,
    timeExistedBackwardGateWithTraveledDistance,
    selectedTraveledDistance,
  );
}

// `selectedTime`에 근접한 (time 존재) forward/backward 게이트 찾기
export function findForwardAndBackwardGateWithTime(gatesState: IGate[], selectedTime: string) {
  let forwardGate = null;
  let backwardGate: IGate | null = null;

  gatesState.forEach((gate) => {
    if (new Date(gate.time) <= new Date(selectedTime)) {
      forwardGate = gate;
    } else if (!backwardGate) {
      backwardGate = gate;
    }
  });

  return { forwardGateWithTime: forwardGate, backwardGateWithTime: backwardGate };
}

// 중간 `time` -> 중간 'traveledDistance'
export function findTraveledDistanceWithForwardAndBackwardGateAndTime(
  forwardGate: IGate,
  backwardGate: IGate,
  selectedTime: string,
) {
  const timeDifference = new Date(backwardGate.time).getTime() - new Date(forwardGate.time).getTime();
  const timeRatio = (new Date(selectedTime).getTime() - new Date(forwardGate.time).getTime()) / timeDifference;
  return forwardGate.traveledDistance + timeRatio * (backwardGate.traveledDistance - forwardGate.traveledDistance);
}

// `traveledDistance`에 근접한 (time 무시) forward/backward 게이트 찾기
export function findForwardAndBackwardGateWithTraveledDistance(
  gatesState: IGate[],
  selectedTraveledDistance: number | null,
): { forwardGateWithTraveledDistance: IGate | null; backwardGateWithTraveledDistance: IGate | null } {
  let forwardGate: IGate | null = null;
  let backwardGate: IGate | null = null;

  if (selectedTraveledDistance != null) {
    gatesState.forEach((gate) => {
      if (gate.traveledDistance <= selectedTraveledDistance) {
        forwardGate = gate;
      } else if (!backwardGate) {
        backwardGate = gate;
      }
    });
  }

  return { forwardGateWithTraveledDistance: forwardGate, backwardGateWithTraveledDistance: backwardGate };
}

// 중간 `traveledDistance` ->  중간 'coordinate'
export function findTraveledCoordinateWithForwardAndBackwardGateAndTraveledDistance(
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

// 'traveledDistance' 에 근접한 (time 존재) forward/backward 게이트 찾기
export function findTimeExistedForwardAndBackwardGateWithTraveledDistance(
  gatesState: IGate[],
  selectedTraveledDistance: number,
) {
  let forwardGate: IGate | null = null;
  let backwardGate: IGate | null = null;

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

// (time 존재) 가장 마지막 게이트 찾기
export function findLatestGate(gatesState: IGate[] | null): IGate | null {
  let latestGate: IGate | null = null;

  if (gatesState) {
    gatesState.forEach((gate) => {
      if (gate.time !== null) {
        latestGate = gate;
      }
    });
  }

  return latestGate;
}
