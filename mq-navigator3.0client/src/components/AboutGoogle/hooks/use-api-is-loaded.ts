import { useApiLoadingStatus } from '@components/AboutGoogle';
import { APILoadingStatus } from '@components/AboutGoogle';
/**
 * Hook to check if the Maps JavaScript API is loaded
 */
export function useApiIsLoaded(): boolean {
  const status = useApiLoadingStatus();

  return status === APILoadingStatus.LOADED;
}
