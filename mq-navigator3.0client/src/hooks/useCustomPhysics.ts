function UseCustomPhysics(props) {
  // 두 좌표 간 거리 계산 함수 (피타고라스 정리 사용)
  function calculateDistance(coord1: Coordinate, coord2: Coordinate) {
    const xDiff = coord2.latitude - coord1.latitude;
    const yDiff = coord2.longitude - coord1.longitude;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  }

// `selectedTime`에 맞는 `selectedPoint`를 계산하는 함수
  function transformTimeToPoint(selectedTime: string) {
    const { forwardGateWithTime, backwardGateWithTime } = findForwardAndBackwardGateWithTime(selectedTime);
    const selectedTraveledDistance = findTraveledDistanceWithForwardAndBackwardGateAndTime(
      forwardGateWithTime,
      backwardGateWithTime,
      selectedTime,
    );
    const { forwardGateWithTraveledDistance, backwardGateWithTraveledDistance } =
      findForwardAndBackwardGateWithTraveledDistance(selectedTraveledDistance);
    const selectedCoordinate = findTraveledCoordinateWithForwardAndBackwardGateAndTraveledDistance(
      forwardGateWithTraveledDistance,
      backwardGateWithTraveledDistance,
      selectedTime,
    );

    return {
      time: selectedTime,
      coordinate: selectedCoordinate,
      traveledDistance: selectedTraveledDistance,
    };
  }

// `selectedPoint`에 맞는 `selectedTime`을 계산하는 함수
  function transformPointToTime(selectedPoint: IGate) {
    const selectedTraveledDistance = selectedPoint.traveledDistance;
    const { timeExistedForwardGateWithTraveledDistance, timeExistedBackwardGateWithTraveledDistance } =
      findTimeExistedForwardAndBackwardGateWithTraveledDistance(selectedTraveledDistance);
    return findTimeWithForwardAndBackwardGateAndTime(
      timeExistedForwardGateWithTraveledDistance,
      timeExistedBackwardGateWithTraveledDistance,
      selectedTraveledDistance,
    );
  }

// `selectedTime`에 근접한 forward/backward 게이트 찾기
  function findForwardAndBackwardGateWithTime(selectedTime: string) {
    let forwardGate = null;
    let backwardGate = null;

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
  function findTraveledDistanceWithForwardAndBackwardGateAndTime(forwardGate, backwardGate, selectedTime) {
    const timeDifference = new Date(backwardGate.time) - new Date(forwardGate.time);
    const timeRatio = (new Date(selectedTime) - new Date(forwardGate.time)) / timeDifference;
    return forwardGate.traveledDistance + timeRatio * (backwardGate.traveledDistance - forwardGate.traveledDistance);
  }

// `selectedTraveledDistance`에 근접한 forward/backward 게이트 찾기
  function findForwardAndBackwardGateWithTraveledDistance(selectedTraveledDistance: number) {
    let forwardGate = null;
    let backwardGate = null;

    gates.forEach((gate) => {
      if (gate.traveledDistance <= selectedTraveledDistance) {
        forwardGate = gate;
      } else if (!backwardGate) {
        backwardGate = gate;
      }
    });

    return { forwardGateWithTraveledDistance: forwardGate, backwardGateWithTraveledDistance: backwardGate };
  }

// 두 좌표 사이의 중간 좌표를 찾는 함수
  export function findTraveledCoordinateWithForwardAndBackwardGateAndTraveledDistance(
    forwardGate,
    backwardGate,
    selectedTime: string,
  ) {
    const traveledDistanceDifference = backwardGate.traveledDistance - forwardGate.traveledDistance;
    const traveledDistanceRatio = (selectedTime - forwardGate.traveledDistance) / traveledDistanceDifference;

    const latitude =
      forwardGate.coordinate.latitude +
      traveledDistanceRatio * (backwardGate.coordinate.latitude - forwardGate.coordinate.latitude);
    const longitude =
      forwardGate.coordinate.longitude +
      traveledDistanceRatio * (backwardGate.coordinate.longitude - forwardGate.coordinate.longitude);

    return { latitude, longitude };
  }

// 주어진 traveledDistance로 time을 찾는 함수
  export function findTimeExistedForwardAndBackwardGateWithTraveledDistance(selectedTraveledDistance) {
    let forwardGate = null;
    let backwardGate = null;

    gates.forEach((gate) => {
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
  export function findTimeWithForwardAndBackwardGateAndTime(forwardGate, backwardGate, selectedTraveledDistance) {
    const distanceDifference = backwardGate.traveledDistance - forwardGate.traveledDistance;
    const distanceRatio = (selectedTraveledDistance - forwardGate.traveledDistance) / distanceDifference;

    const forwardTime = new Date(forwardGate.time).getTime();
    const backwardTime = new Date(backwardGate.time).getTime();
    const selectedTime = new Date(forwardTime + distanceRatio * (backwardTime - forwardTime));

    return selectedTime.toISOString();
  }
  return {};
}

export default UseCustomPhysics;
