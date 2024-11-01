export interface IMember {
  id: number;
  email: string;
  name: string;
  nickname: string;
  password: string;
  workspaces: IWorkspace[];
}

export interface memberSliceState {
  id: number;
  email: string;
  name: string;
  nickname: string;
  password: string;
  workspaces: IWorkspace[];
  accessToken: string;
  refreshToken: string;
}

export interface IWorkspace {
  id: number;
  name: string;
  url: string;
  ownerId: number;
  members: number[];
  routes: IRoute[];
  route: IRoute;
}

export interface IRoute {
  id: number;
  name: string;
}

export interface IGate {
  id: number;
  sequence: number;
  time: string; //ISO String
  coordinate: Coordinate;
  traveledDistance: number;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface ISetting {
  id: number;
  workspaceId: number;
  colorSetting: ColorSetting;
  refreshInterval: RefreshInterval;
  toleranceRange: ToleranceRange;
  speedPredictionInterval: SpeedPredictionInterval;
  displaySections: DisplaySection[];
  sectionDatas: SectionData[];
}

export interface ColorSetting {
  initialColor: Color;
  decelerationColor: Color;
  constantSpeedColor: Color;
  accelerationColor: Color;
}

export enum Color {
  SKY_BLUE = 'SKY_BLUE',
  PURPLE = 'PURPLE',
  LIGHT_GREEN = 'LIGHT_GREEN',
  YELLOW = 'YELLOW',
}

export enum RefreshInterval {
  ONE = 'ONE',
  THREE = 'THREE',
  TEN = 'TEN',
  SIXTY = 'SIXTY',
}

export enum ToleranceRange {
  FIVE = 'FIVE',
  TEN = 'TEN',
  TWENTY = 'TWENTY',
}

export enum SpeedPredictionInterval {
  FIRST = 'FIRST',
  PREVIOUS = 'PREVIOUS',
}

export interface DisplaySection {
  start: Location;
  end: Location;
}

export enum Location {
  FIRST_GATE = 'FIRST_GATE',
  LAST_GATE = 'LAST_GATE',
  PREVIOUS_GATE_BASED_ON_SELECTED = 'PREVIOUS_GATE_BASED_ON_SELECTED',
  LATEST_GATE_BASED_ON_SELECTED = 'LATEST_GATE_BASED_ON_SELECTED',
  NEXT_GATE_BASED_ON_SELECTED = 'NEXT_GATE_BASED_ON_SELECTED',
  PREVIOUS_GATE_BASED_ON_CURRENT = 'PREVIOUS_GATE_BASED_ON_CURRENT',
  LATEST_GATE_BASED_ON_CURRENT = 'LATEST_GATE_BASED_ON_CURRENT',
  NEXT_GATE_BASED_ON_CURRENT = 'NEXT_GATE_BASED_ON_CURRENT',
}

export enum SectionData {
  DISTANCE = 'DISTANCE',
  ELAPSED_TIME = 'ELAPSED_TIME',
  ESTIMATED_TIME = 'ESTIMATED_TIME',
  ELAPSED_SPEED = 'ELAPSED_SPEED',
  ESTIMATED_SPEED = 'ESTIMATED_SPEED',
}

export interface PlaybarState {
  currentTime: string;
  isLive: boolean; // isLive 상태 추가
  selectedTime: string | null;
  selectedPoint: NullableIGate | null;
  firstGate: IGate | null;
  lastGate: IGate | null;
  previousGateBasedOnSelected: IGate | null;
  latestGateBasedOnSelected: IGate | null;
  nextGateBasedOnSelected: IGate | null;
  previousGateBasedOnCurrent: IGate | null;
  latestGateBasedOnCurrent: IGate | null;
  nextGateBasedOnCurrent: IGate | null;
}

export interface MarkerPosition {
  lat: number;
  lng: number;
}

export interface NullableIGate {
  id: number;
  sequence: number;
  time: string | null; //ISO String
  coordinate: Coordinate | null;
  traveledDistance: number | null;
}
