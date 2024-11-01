import React, { useEffect, useState, useRef, useCallback } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import useCustomGates from '@hooks/useCustomGates';

// type latLngCoordinates = { lat: number; lng: number };

const MapComponent: React.FC = () => {
  const { gatesState, updateGatesWithIndex } = useCustomGates();
  const containerRef = useRef<HTMLDivElement | null>(null); // HTMLDivElement 참조
  const mapRef = useRef<google.maps.Map | null>(null); // google.maps.Map 참조
  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [path, setPath] = useState<google.maps.LatLngLiteral[] | null>([]);
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);
  const initialLocation = { lat: 37.5665, lng: 126.978 };

  useEffect(() => {
    if (containerRef.current && !mapRef.current) {
      // div 요소에 Google Map 초기화
      mapRef.current = new google.maps.Map(containerRef.current, {
        center: initialLocation,
        zoom: 10,
        // mapId: 'd7a1d96b7d5ef0af', //나
        mapId: '70c296db922d358d', //아빠
      });
      updateMapMarkers();
    }
  }, [initialLocation]);

  useEffect(() => {
    if (gatesState.length && mapRef.current) {
      updateMapMarkers();
    }
  }, [gatesState]);

  const updateMapMarkers = useCallback(() => {
    if (!mapRef.current) return;
    setMarkers([]);
    setPath([]);

    gatesState.forEach((gate, index) => {
      const { latitude: lat, longitude: lng } = gate.coordinate;

      if (lat && lng) {
        const markerPosition: google.maps.LatLngLiteral = createPosition(lat, lng);
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: markerPosition,
          map: mapRef.current,
          gmpDraggable: true,
          title: `Point ${index + 1}`,
        });

        marker.addListener('dragend', (event: google.maps.MapMouseEvent) => {
          const latLng = event.latLng;
          if (latLng) {
            const newPosition = createCoordinate(latLng.lat(), latLng.lng());
            updateGatesWithIndex(index, newPosition);
          }
        });

        markers.push(marker);
        path?.push(markerPosition);
      }
    });

    if (path) {
      updatePolyline(path);
    }
  }, [gatesState, markers, updateGatesWithIndex]);

  const updatePolyline = (path: google.maps.LatLngLiteral[]) => {
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
  };

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
