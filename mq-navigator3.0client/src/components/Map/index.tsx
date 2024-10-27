import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import { APIProvider, GoogleMapsContext, Map } from '@vis.gl/react-google-maps';
import useCustomGates from '@hooks/useCustomGates';

const MapComponent: React.FC = () => {
  const mapRef = useRef<google.maps.Map | null>(null); // map 참조
  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);
  const initialLocation = { lat: 37.5665, lng: 126.978 };
  const { gatesState, updateGates } = useCustomGates();
  const mapContext = useContext(GoogleMapsContext);

  useEffect(() => {
    if (mapContext?.map && !mapRef.current) {
      mapRef.current = mapContext.map;
      updateMapMarkers(); // 초기 마커 설정
    }
  }, [mapContext?.map]);

  useEffect(() => {
    if (gatesState.length && mapRef.current) {
      updateMapMarkers();
    }
  }, [gatesState]);

  const updateMapMarkers = useCallback(() => {
    if (!mapContext?.map) {
      console.log('mapContenxt.map is null');
      return;
    }
    // 기존 마커 삭제
    markers.forEach((marker) => (marker.map = null));
    setMarkers([]);

    const newMarkers: google.maps.marker.AdvancedMarkerElement[] = [];
    const newPath: google.maps.LatLngLiteral[] = [];

    gatesState.forEach((gate, index) => {
      const { latitude: lat, longitude: lng } = gate.coordinate;

      if (lat && lng) {
        const markerPosition: google.maps.LatLngLiteral = { lat, lng };
        console.log('eachGate lat, lng : ', lat, lng);
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: markerPosition,
          map: mapRef.current,
          gmpDraggable: true,
          title: `Point ${index + 1}`,
        });

        marker.addListener('dragend', (event: google.maps.MapMouseEvent) => {
          const latLng = event.latLng;
          if (latLng) {
            const newPosition = { lat: latLng.lat(), lng: latLng.lng() };
            updateGates(index, newPosition);
            updateMapMarkers();
          }
        });

        newMarkers.push(marker);
        newPath.push(markerPosition);
      }
    });

    setMarkers(newMarkers);
    updatePolyline(newPath);
  }, [gatesState, markers, updateGates]);

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

  return (
    <APIProvider apiKey={'AIzaSyDfXQ99l7TWfyfvujf8d52Ug1EDl5ok20M'}>
      <Map style={{ width: '100%', height: '100%' }} defaultCenter={initialLocation} defaultZoom={10} />
    </APIProvider>
  );
};

export default MapComponent;
