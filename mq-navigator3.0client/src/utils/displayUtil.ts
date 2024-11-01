import { IGate, Location, NullableIGate, PlaybarState } from '@typings/db';

export function getGateByLocation(playbarState: PlaybarState, location: Location): IGate | null {
  switch (location) {
    case Location.FIRST_GATE:
      return playbarState.firstGate;
    case Location.LAST_GATE:
      return playbarState.lastGate;
    case Location.PREVIOUS_GATE_BASED_ON_SELECTED:
      return playbarState.previousGateBasedOnSelected;
    case Location.LATEST_GATE_BASED_ON_SELECTED:
      return playbarState.latestGateBasedOnSelected;
    case Location.NEXT_GATE_BASED_ON_SELECTED:
      return playbarState.nextGateBasedOnSelected;
    case Location.PREVIOUS_GATE_BASED_ON_CURRENT:
      return playbarState.previousGateBasedOnCurrent;
    case Location.LATEST_GATE_BASED_ON_CURRENT:
      return playbarState.latestGateBasedOnCurrent;
    case Location.NEXT_GATE_BASED_ON_CURRENT:
      return playbarState.nextGateBasedOnCurrent;
    default:
      return null;
  }
}

export function calculateDistance(startGate: NullableIGate | null, endGate: NullableIGate | null) {
  let distance: number | null = null;
  if (
    startGate !== null &&
    endGate !== null &&
    startGate.traveledDistance !== null &&
    endGate.traveledDistance !== null
  ) {
    distance = endGate.traveledDistance - startGate.traveledDistance;
  }
  return distance;
}

export function calculateTime(startGate: NullableIGate | null, endGate: NullableIGate | null) {
  let elaspedTime: number | null = null;
  if (
    startGate !== null &&
    endGate !== null &&
    startGate.traveledDistance !== null &&
    endGate.traveledDistance !== null &&
    startGate.time !== null &&
    endGate.time !== null
  ) {
    elaspedTime = new Date(endGate.time).getTime() - new Date(startGate.time).getTime();
  }
  return elaspedTime;
}

export function calculateSpeed(startGate: NullableIGate | null, endGate: NullableIGate | null) {
  let elaspedSpeed: number | null = null;
  if (
    startGate !== null &&
    endGate !== null &&
    startGate.traveledDistance !== null &&
    endGate.traveledDistance !== null &&
    startGate.time !== null &&
    endGate.time !== null
  ) {
    let distance = endGate.traveledDistance - startGate.traveledDistance;
    let elaspedTime = new Date(endGate.time).getTime() - new Date(startGate.time).getTime();
    elaspedSpeed = distance / elaspedTime;
  }
  return elaspedSpeed;
}

export function formatToTwoDecimalPlaces(value: number | null): string {
  return value !== null ? value.toFixed(2) : 'null';
}
