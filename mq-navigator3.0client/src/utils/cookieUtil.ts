import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// setCookie 함수의 타입 정의
export const setCookie = (name: string, value: string, days: number): void => {
  // 이름 값 보관기한 설정
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + days);

  // 쿠키 설정 (경로와 만료일 포함)
  cookies.set(name, value, { path: '/', expires });
};

// getCookie 함수의 타입 정의
export const getCookie = (name: string): string | undefined => {
  return cookies.get(name);
};

// removeCookie 함수의 타입 정의
export const removeCookie = (name: string, path: string = '/'): void => {
  cookies.remove(name, { path });
};
