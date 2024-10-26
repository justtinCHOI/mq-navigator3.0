import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UseValidate() {
  //위도 또는 경도 유효성
  function validateCoordinate(value: number, componentType: 'lat' | 'lng') {
    const isNumeric = (value: any) => /^-?\d*(\.\d+)?$/.test(value);

    const validateRange = componentType === 'lat' ? value >= -90 && value <= 90 : value >= -180 && value <= 180;
    const validateType = componentType === 'lat' ? isNumeric(value) : isNumeric(value);
    const isValid = validateRange && validateType;

    return { validateRange, validateType, isValid };
  }

  // 각 좌표 유효성
  function validateCoordinateInput(inputElement: HTMLInputElement) {
    const contentLine = inputElement.closest('.contentLine');
    const latElement = contentLine?.querySelector('input:nth-child(2)');
    const lngElement = contentLine?.querySelector('input:nth-child(3)');

    let componentType: 'lat' | 'lng' | undefined;

    if (inputElement === latElement) {
      componentType = 'lat';
    } else if (inputElement === lngElement) {
      componentType = 'lng';
    }

    // 기본 값 설정 또는 에러 핸들링
    if (!componentType) {
      console.error('Invalid input element: componentType could not be determined.');
      return { isValid: false };
    }

    const value = inputElement.value;
    const { validateRange, validateType, isValid } = validateCoordinate(Number(value), componentType);

    updateInputStyle(inputElement, isValid);

    if (!validateType) {
      toast.error('Invalid Type: Please enter numeric values for latitude and longitude.');
    } else if (!validateRange) {
      toast.error('Invalid range: Latitude must be between -90 and 90, and Longitude between -180 and 180.');
    }

    return { isValid };
  }

  //유효성 여부로 input style 변경
  function updateInputStyle(inputElement: HTMLInputElement, isValid: boolean) {
    if (!isValid) {
      inputElement.style.color = 'red';
      inputElement.style.border = '2px solid red'; // 유효하지 않으면 테두리 색상도 빨간색으로 변경
    } else {
      inputElement.style.color = '#000';
      inputElement.style.border = ''; // 유효하면 기본 테두리로 복원
    }
  }

  return { validateCoordinate, validateCoordinateInput, updateInputStyle };
}

export default UseValidate;
