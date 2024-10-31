import styled from '@emotion/styled';

export const PlaybarContainer = styled.div`
  width: 100%;
  height: 120px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ContentRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 170px;
  justify-content: center;
  align-items: center;
`;

export const RightContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
export const ContentLine = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
`;

export const ContentLineText = styled.p`
  margin: 10px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-weight: 500;
`;

export const ContentLineDiv = styled.div`
  margin: 10px;
  height: 40px;
  border-radius: 4px;
  padding: 5px;
  font-size: 16px;
  font-weight: 500;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #666;
    box-shadow: 0 0 5px #ccc;
  }
`;

export const ContentLineInput = styled.input`
  margin: 10px;
  height: 40px;
  border-radius: 4px;
  padding: 5px;
  font-size: 16px;
  font-weight: 500;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #666;
    box-shadow: 0 0 5px #ccc;
  }
`;

export const SelectOption = styled.select`
  margin: 10px;
  height: 40px;
  border: none;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 5px;
  font-size: 16px;
  font-weight: 500;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
export const CustomIconButton = styled.button`
  display: flex;
  margin: 10px;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  justify-content: space-around;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ccc;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const CustomTextButton = styled.button`
  margin: 10px;
  padding: 5px 10px;
  color: #000;
  border: 1px solid #999;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ccc;
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px #ccc;
  }
`;

export const RightContentIcon = styled.i`
  flex: 1;
  margin: 10px;
  padding: 5px;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;

  &.dimmed {
    color: #aaa; // 어두운 색상으로 변경
    cursor: not-allowed; // 클릭 비활성화 느낌
  }

  &:active {
    color: #000;
  }
`;

export const ProgressContainer = styled.div`
  bottom: 30px;
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px;
  height: 40px;
`;

export const ProgressBar = styled.input`
  width: calc(100%);
  height: 10px;
  appearance: none;
  background-color: #ccc;
  cursor: pointer;
  //margin: 0 10px 0 10px;
  margin: 0;
  position: absolute;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #333;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  &:active::-webkit-slider-thumb {
    background-color: #333;
  }
`;

// Styled component for GateMarker
export const GateMarker = styled.div`
  position: absolute;
  border-radius: 4px;
  top: 0;
  width: 15px;
  height: 20px;
  background-color: white;
  transform: translateX(-50%); // 정 중앙 위치
  font-size: 14px;
  color: black;
  text-align: center;
`;

export const DistanceDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  width: 120px;
  padding: 20px;
  font-size: 14px;
  font-weight: 500;
`;
