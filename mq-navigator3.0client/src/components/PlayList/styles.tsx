import styled from '@emotion/styled';

export const PlayListContainer = styled.div`
  width: 100%;
  height: 238px;
`;

export const ContentLine = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
`;

export const ContentLineDiv = styled.div`
  margin: 20px;
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

export const RightContentIcon = styled.i`
  flex: 1;
  margin: auto;
  padding: 5px;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;

  &:active {
    color: #000;
  }
`;

export const SelectOption = styled.select`
  margin: 20px;
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
  width: 100%;
  height: 10px;
  appearance: none;
  background-color: #ccc;
  cursor: pointer;
  margin-right: 20px;

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

export const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  width: 120px;
  padding: 20px;
  font-size: 14px;
  font-weight: 500;
`;
