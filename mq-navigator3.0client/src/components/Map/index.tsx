import React, { useEffect } from 'react';
import { MapContainer } from '@components/Map/styles';

const Map = () => {
  let viewMap; // Create와 View 메뉴에 대한 별도의 지도
  const initialLocation = { lat: 37.5665, lng: 126.978 }; // 초기 좌표

  useEffect(() => {
    // 구글 지도 API 스크립트 추가
    const script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDfXQ99l7TWfyfvujf8d52Ug1EDl5ok20M&v=weekly&libraries=marker';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      // 스크립트가 로드된 후 지도 초기화
      viewMap = new (window as any).google.maps.Map(document.getElementById('viewMap'), {
        zoom: 10,
        center: initialLocation,
        mapId: 'DEMO_MAP_ID2',
      });
    };
  }, []);

  return <MapContainer id="viewMap"></MapContainer>;
};

export default Map;
