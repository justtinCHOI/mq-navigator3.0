import { Location } from '@typings/db';

export function convertLocationToString(location: Location) {
  if (location == Location.FIRST_GATE) {
    return 'first gate';
  } else if (location == Location.LAST_GATE) {
    return 'last gate';
  } else if (location == Location.PREVIOUS_GATE_BASED_ON_SELECTED) {
    return 'previous gate based on selected';
  } else if (location == Location.LATEST_GATE_BASED_ON_SELECTED) {
    return 'latest gate based on selected';
  } else if (location == Location.NEXT_GATE_BASED_ON_SELECTED) {
    return 'next gate based on selected';
  } else if (location == Location.PREVIOUS_GATE_BASED_ON_CURRENT) {
    return 'previous gate based on current';
  } else if (location == Location.LATEST_GATE_BASED_ON_CURRENT) {
    return 'latest gate based on current';
  } else if (location == Location.NEXT_GATE_BASED_ON_CURRENT) {
    return 'next gate based on current';
  }
}
