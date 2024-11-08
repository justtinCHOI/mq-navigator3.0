import React, { useEffect, useState, useRef, useCallback } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import useCustomGates from '@hooks/useCustomGates';
import { MarkerPosition, NullableCoordinate } from '@typings/db';
import useCustomPlaybar from '@hooks/useCustomPlaybar';
import useCustomSetting from '@hooks/useCustomSetting';
import { calculateSpeed, convertEnumColorToString, convertEnumToleranceRangeToNumber } from '@utils/displayUtil';

// type latLngCoordinates = { lat: number; lng: number };

const MapComponent: React.FC = () => {
  const { gatesState, updateGatesWithIndex } = useCustomGates();
  const { playbarState } = useCustomPlaybar();
  const containerRef = useRef<HTMLDivElement | null>(null); // HTMLDivElement 참조
  const mapRef = useRef<google.maps.Map | null>(null); // google.maps.Map 참조
  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[] | null>([]);
  const [path, setPath] = useState<google.maps.LatLngLiteral[] | null>([]);
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);
  const [polylines, setPolylines] = useState<google.maps.Polyline[] | null>(null);
  const [initialLocation, setInitialLocation] = useState<MarkerPosition>({ lat: 37.5665, lng: 126.978 });
  const [selectedMarker, setSelectedMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null);
  const { selectedPoint } = playbarState;
  const [selectedCoordinate, setSelectedCoordinate] = useState<NullableCoordinate | null>(null);
  const { settingState } = useCustomSetting();
  const { colorSetting, toleranceRange } = settingState;

  // 선행조건 :
  //      gatesMarkers 는 전역 gatesState 가 없데이트가 되어있어야 가능하다.
  //      polyline 은 전역 path 값이 업데이트가 되어있어야 가능하다. 선행조건 : updateGatesMarkers -> path 설정
  //      selectedPointMarker 는 selectedPoint 가 업데이트가 되어있어야 가능하다.

  useEffect(() => {
    if (selectedPoint) {
      setSelectedCoordinate(selectedPoint.coordinate);
    }
  }, [selectedPoint, selectedCoordinate]);

  useEffect(() => {
    executeAllSequentially().then();
  }, [gatesState, selectedCoordinate, mapRef, settingState]);

  const executeAllSequentially = useCallback(async () => {
    if (containerRef.current) {
      await rerenderMap();
      await updateGatesMarkers();
      // await updatePolyline();
      await updatePolylineWithColor();
      await updateSelectedPointMarker();
    }
  }, [gatesState, selectedCoordinate, mapRef, settingState]);

  const rerenderMap = useCallback(async () => {
    if (containerRef.current) {
      setMarkers([]);
      setPath([]);
      setSelectedMarker(null);
      // gatesState 배열이 비어 있는지 확인
      if (gatesState && gatesState[0] && gatesState[0].coordinate) {
        const { latitude, longitude } = gatesState[0].coordinate;

        // latitude와 longitude 값이 존재할 때만 newInitialLocation을 설정
        if (latitude && longitude) {
          const newInitialLocation = createPosition(latitude, longitude);
          setInitialLocation(newInitialLocation);
        }
      }
      mapRef.current = new google.maps.Map(containerRef.current, {
        center: initialLocation,
        zoom: 7,
        // mapId: 'd7a1d96b7d5ef0af', //나
        mapId: '70c296db922d358d',
      });
    }
  }, [initialLocation, gatesState]);

  const updateGatesMarkers = useCallback(async () => {
    if (!mapRef.current) return;
    let newMarkers: google.maps.marker.AdvancedMarkerElement[] = []; // 빈 배열로 초기화
    let newPath: google.maps.LatLngLiteral[] = []; // 빈 배열로 초기화

    gatesState.forEach((gate, index) => {
      const { latitude: lat, longitude: lng } = gate.coordinate;

      const gateTag = document.createElement('div');
      gateTag.className = 'gate-tag';
      gateTag.textContent = 'Gate ' + (index + 1);

      if (lat && lng) {
        const markerPosition: google.maps.LatLngLiteral = createPosition(lat, lng);
        const newMarker = new google.maps.marker.AdvancedMarkerElement({
          position: markerPosition,
          map: mapRef.current,
          content: gateTag,
          gmpDraggable: true,
        });

        newMarker.addListener('dragend', (event: google.maps.MapMouseEvent) => {
          const latLng = event.latLng;
          if (latLng) {
            const newCoordinate = createCoordinate(latLng.lat(), latLng.lng());
            updateGatesWithIndex(index, newCoordinate);
            const newPosition = createPosition(latLng.lat(), latLng.lng());
            setInitialLocation(newPosition);

            // path 배열의 해당 마커 위치를 새로운 위치로 업데이트
            const updatedPath = path ? [...path] : [];
            updatedPath[index] = newPosition;
            setPath(updatedPath); // 상태 업데이트
          }
        });

        newMarkers.push(newMarker);
        newPath.push(markerPosition);
      }
    });

    setMarkers(newMarkers);
    setPath(newPath);
  }, [gatesState, path, updateGatesWithIndex, mapRef]);

  const updatePolyline = useCallback(async () => {
    if (polyline) {
      polyline.setMap(null);
    }

    const newPolyline = new google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: '#999977',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    newPolyline.setMap(mapRef.current);
    setPolyline(newPolyline);
  }, [polyline, path, mapRef]);

  const updatePolylineWithColor = useCallback(async () => {
    const newPolylines: google.maps.Polyline[] | null = [];

    gatesState.forEach((gate, index) => {
      if (index < gatesState.length - 1) {
        const newPath = [
          createPosition(gatesState[index].coordinate.latitude, gatesState[index].coordinate.longitude),
          createPosition(gatesState[index + 1].coordinate.latitude, gatesState[index + 1].coordinate.longitude),
        ];

        let strokeColor = '#999977'; // 기본 색상

        if (
          gatesState[index].time !== null &&
          gatesState[index + 1].time !== null &&
          gatesState[index].traveledDistance !== null &&
          gatesState[index + 1].traveledDistance !== null
        ) {
          const currentSegmentSpeed = calculateSpeed(gatesState[index], gatesState[index + 1]) as number;

          if (index === 0 || !gatesState[index - 1].time === null || !gatesState[index - 1].traveledDistance === null) {
            strokeColor = convertEnumColorToString(colorSetting.initialColor);
          } else {
            const previousSegmentSpeed: number = calculateSpeed(gatesState[index - 1], gatesState[index]) as number;
            if (
              Math.abs(currentSegmentSpeed - previousSegmentSpeed) <
              (convertEnumToleranceRangeToNumber(toleranceRange) / 100) * currentSegmentSpeed
            ) {
              strokeColor = convertEnumColorToString(colorSetting.constantSpeedColor);
            } else if (currentSegmentSpeed < previousSegmentSpeed) {
              strokeColor = convertEnumColorToString(colorSetting.decelerationColor);
            } else {
              strokeColor = convertEnumColorToString(colorSetting.accelerationColor);
            }
          }
        }

        const polyline = new google.maps.Polyline({
          path: newPath,
          geodesic: true,
          strokeColor: strokeColor,
          strokeOpacity: 1.0,
          strokeWeight: 5,
        });

        polyline.setMap(mapRef.current);
        newPolylines.push(polyline);
      }
    });

    setPolylines(newPolylines);
  }, [settingState, gatesState, toleranceRange]);

  const updateSelectedPointMarker = useCallback(async () => {
    let newSelectedMarker: google.maps.marker.AdvancedMarkerElement | null = null;
    if (selectedCoordinate) {
      const { latitude: lat, longitude: lng } = selectedCoordinate;
      if (lat && lng) {
        const markerPosition: google.maps.LatLngLiteral = createPosition(lat, lng);

        const pointTag = document.createElement('div');
        pointTag.className = 'point-tag';
        pointTag.textContent = 'Selected ';

        newSelectedMarker = new google.maps.marker.AdvancedMarkerElement({
          position: markerPosition,
          map: mapRef.current,
          content: pointTag,
          gmpDraggable: true,
        });
      }
    }
    setSelectedMarker(newSelectedMarker);
  }, [selectedCoordinate, mapRef]);

  function createCoordinate(latitude: number, longitude: number) {
    return { latitude: latitude, longitude: longitude };
  }

  function createPosition(lat: number, lng: number) {
    return { lat: lat, lng: lng };
  }

  return (
    <>
      {/*<APIProvider apiKey={'AIzaSyDfXQ99l7TWfyfvujf8d52Ug1EDl5ok20M'}>*/}
      <APIProvider apiKey={'AIzaSyCfTicyWufxJ5OqE32Yn4t4fJo0vI72gUc'}>
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      </APIProvider>
    </>
  );
};

export default MapComponent;
