import React, {
  CSSProperties,
  PropsWithChildren,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  forwardRef,
  MutableRefObject,
} from 'react';

import { APIProviderContext } from '../api-provider';
import { MapEventProps, useMapEvents } from './use-map-events';
import { useMapOptions } from './use-map-options';
import { useApiLoadingStatus } from '@components/AboutGoogle';
import { APILoadingStatus } from '@components/AboutGoogle';
import { DeckGlCompatProps, useDeckGLCameraUpdate } from './use-deckgl-camera-update';
import { toLatLngLiteral } from '@components/AboutGoogle';
import { useMapCameraParams } from './use-map-camera-params';
import { AuthFailureMessage } from './auth-failure-message';
import { useMapInstance } from './use-map-instance';

export interface GoogleMapsContextValue {
  map: google.maps.Map | null;
}
export const GoogleMapsContext = React.createContext<GoogleMapsContextValue | null>(null);

export type MapCameraProps = {
  center: google.maps.LatLngLiteral;
  zoom: number;
  heading?: number;
  tilt?: number;
};

export const ColorScheme = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
  FOLLOW_SYSTEM: 'FOLLOW_SYSTEM',
} as const;

// eslint-disable-next-line no-redeclare
export type ColorScheme = (typeof ColorScheme)[keyof typeof ColorScheme];

export const RenderingType = {
  VECTOR: 'VECTOR',
  RASTER: 'RASTER',
  UNINITIALIZED: 'UNINITIALIZED',
} as const;

// eslint-disable-next-line no-redeclare
export type RenderingType = (typeof RenderingType)[keyof typeof RenderingType];

export type MapProps = Omit<google.maps.MapOptions, 'renderingType' | 'colorScheme'> &
  MapEventProps &
  DeckGlCompatProps & {
    id?: string;
    style?: CSSProperties;
    className?: string;
    colorScheme?: ColorScheme;
    renderingType?: RenderingType;
    controlled?: boolean;
    reuseMaps?: boolean;
    defaultCenter?: google.maps.LatLngLiteral;
    defaultZoom?: number;
    defaultHeading?: number;
    defaultTilt?: number;
    defaultBounds?: google.maps.LatLngBoundsLiteral & { padding?: number | google.maps.Padding };
  };

export const GoogleMap = forwardRef<HTMLDivElement, PropsWithChildren<MapProps>>((props, ref) => {
  const { children, id, className, style } = props;
  const context = useContext(APIProviderContext);
  const loadingStatus = useApiLoadingStatus();

  if (!context) {
    throw new Error('<Map> can only be used inside an <ApiProvider> component.');
  }

  const [map, mapRef, cameraStateRef] = useMapInstance(props, context) as [
    google.maps.Map | null,
    MutableRefObject<HTMLDivElement | null>,
    MutableRefObject<any>,
  ];

  useMapCameraParams(map, cameraStateRef, props);
  useMapEvents(map, props);
  useMapOptions(map, props);

  const isDeckGlControlled = useDeckGLCameraUpdate(map, props);
  const isControlledExternally = !!props.controlled;

  useEffect(() => {
    if (!map) return;

    if (isDeckGlControlled) {
      map.setOptions({ disableDefaultUI: true });
    }

    if (isDeckGlControlled || isControlledExternally) {
      map.setOptions({
        gestureHandling: 'none',
        keyboardShortcuts: false,
      });
    }

    return () => {
      map.setOptions({
        gestureHandling: props.gestureHandling,
        keyboardShortcuts: props.keyboardShortcuts,
      });
    };
  }, [map, isDeckGlControlled, isControlledExternally, props.gestureHandling, props.keyboardShortcuts]);

  const center = props.center ? toLatLngLiteral(props.center) : null;
  const cameraOptions: google.maps.CameraOptions = useMemo(
    () => ({
      center: center ?? { lat: 0, lng: 0 },
      zoom: props.zoom ?? 0,
      heading: props.heading ?? 0,
      tilt: props.tilt ?? 0,
    }),
    [center, props.zoom, props.heading, props.tilt],
  );

  useLayoutEffect(() => {
    if (!map || !isControlledExternally) return;

    map.moveCamera(cameraOptions);
    const listener = map.addListener('bounds_changed', () => {
      map.moveCamera(cameraOptions);
    });

    return () => listener.remove();
  }, [map, isControlledExternally, cameraOptions]);

  const combinedStyle: CSSProperties = useMemo(
    () => ({
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: isDeckGlControlled ? -1 : 0,
      ...style,
    }),
    [style, isDeckGlControlled],
  );

  const contextValue: GoogleMapsContextValue = useMemo(() => ({ map }), [map]);

  if (loadingStatus === APILoadingStatus.AUTH_FAILURE) {
    return (
      <div style={{ position: 'relative', ...(className ? {} : combinedStyle) }} className={className}>
        <AuthFailureMessage />
      </div>
    );
  }

  return (
    <div
      ref={(instance) => {
        mapRef.current = instance;
        if (typeof ref === 'function') {
          ref(instance);
        } else if (ref) {
          (ref as MutableRefObject<HTMLDivElement | null>).current = instance;
        }
      }}
      data-testid={'map'}
      style={className ? undefined : combinedStyle}
      className={className}
      {...(id ? { id } : {})}
    >
      {map ? <GoogleMapsContext.Provider value={contextValue}>{children}</GoogleMapsContext.Provider> : null}
    </div>
  );
});

export default GoogleMap;
