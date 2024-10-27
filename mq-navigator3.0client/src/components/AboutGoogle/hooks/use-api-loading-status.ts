import { useContext } from 'react';
import { APIProviderContext } from '@components/AboutGoogle';
import { APILoadingStatus } from '@components/AboutGoogle';

export function useApiLoadingStatus(): APILoadingStatus {
  return useContext(APIProviderContext)?.status || APILoadingStatus.NOT_LOADED;
}
