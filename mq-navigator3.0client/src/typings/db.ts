export interface Member extends Auditable {
  id: number;
  email: string;
  name: string;
  nickname: string;
  password: string;
  ownedWorkspaces: Workspace[];
  workspaces: Workspace[];
  memberRoleList: MemberRole[];
  memberStatus: MemberStatus;
}

export interface Auditable {
  createdAt: Date | null;
  modifiedAt: Date | null;
}

export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum MemberRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

// Workspace 타입 정의
export interface Workspace extends Copyright {
  id: number;
  name: string;
  url: string;
  owner: Member;
  members: Member[];
  route: Route;
  routes: Route[];
  gates: Gate[];
}

export interface Route extends Copyright {
  id: number;
  name: string;
  coordinates: Coordinate[];
  workspace: Workspace;
}

export interface Copyright extends Auditable {
  isPublic: boolean;
  usage: number;
  copyrightHolder: string;
}

export interface Gate {
  id: number;
  index: number;
  coordinate: Coordinate;
  time: Date;
  traveledDistance: number;
  workspace: Workspace;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Setting {
  id: number;
  member: Member;
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

export interface Playbar {
  selectedTime: Date;
  selectedPoint: Gate;
}
