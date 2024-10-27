export const APILoadingStatus = {
  NOT_LOADED: 'NOT_LOADED',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  FAILED: 'FAILED',
  AUTH_FAILURE: 'AUTH_FAILURE',
};
// eslint-disable-next-line no-redeclare
export type APILoadingStatus = (typeof APILoadingStatus)[keyof typeof APILoadingStatus];
