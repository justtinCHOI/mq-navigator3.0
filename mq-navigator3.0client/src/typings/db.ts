export interface IUser {
  id: number;
  nickname: string;
  email: string;
  Workspaces: IWorkspace[];
}

export interface IWorkspace {
  id: number;
  name: string;
  url: string; // 주소 창에 보이는 주소
  OwnerId: number; // 워크스페이스 만든 사람 아이디
}

export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum MemberRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface Member {
  id: number;
  email: string;
  name: string;
  nickname: string;
  password: string;
  ownedWorkspaces: Workspace[];
  workspaces: Workspace[];
  memberRoleList: MemberRole[];
  memberStatus: MemberStatus;
  createdAt: string;
  modifiedAt: string;
}

// Workspace 타입 정의
export interface Workspace extends Copyright {
  id: number;
  name: string;
  url: string;
  owner: Member;
  members: Member[];
  routes: Route[];
  times: Date[];
  gates: Gate[];
}

export interface Route extends Copyright {
  id: number;
  name: string;
  coordinates: Coordinate[];
  workspace: Workspace;
}

export interface Copyright {
  isPublic: boolean;
  usage: number;
  copyrightHolder: string;
}

export interface Gate {
  id: number;
  index: number;
  coordinate: Coordinate;
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

export enum SpeedPredictionInterval {
  FIRST = 'FIRST',
  PREVIOUS = 'PREVIOUS',
}

export interface DisplaySection {
  start: Location;
  end: Location;
}

export enum Location {
  START = 'START',
  END = 'END',
  CURRENT = 'CURRENT',
  SELECTED = 'SELECTED',
}

export enum SectionData {
  DISTANCE = 'DISTANCE',
  ELAPSED_TIME = 'ELAPSED_TIME',
  ESTIMATED_TIME = 'ESTIMATED_TIME',
  ELAPSED_SPEED = 'ELAPSED_SPEED',
  ESTIMATED_SPEED = 'ESTIMATED_SPEED',
}
