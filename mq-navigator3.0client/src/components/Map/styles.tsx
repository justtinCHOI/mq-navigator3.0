import styled from '@emotion/styled';

// styled div 컴포넌트의 이름을 MapContainer로 변경
export const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 158px);
`;

export const InfoDiv = styled.div`
  z-index: 100;
  width: 50vw;
  height: 350px;
  bottom: 10px;
  right: 10px;
  position: absolute;
  background: #f0f0f0;
  opacity: 0.6;
`;
