// Date형식을 MMDD hhmmss 형식으로 변환하는 함수
export function dateToString(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월
  const day = String(date.getDate()).padStart(2, '0'); // 일
  const hours = String(date.getHours()).padStart(2, '0'); // 시
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 분
  const seconds = String(date.getSeconds()).padStart(2, '0'); // 초
  return `${month}${day} ${hours}${minutes}${seconds}`;
}

// MMDD hhmmss 형식을 Date로 변환하는 함수
export function stringToDate(time: string): Date {
  // MMDD hhmmss 형식을 분리하여 월, 일, 시, 분, 초 값으로 변환
  const month = parseInt(time.slice(0, 2), 10) - 1; // JS의 월은 0부터 시작하므로 -1 필요
  const day = parseInt(time.slice(2, 4), 10);
  const hours = parseInt(time.slice(5, 7), 10);
  const minutes = parseInt(time.slice(7, 9), 10);
  const seconds = parseInt(time.slice(9, 11), 10);

  // 현재 연도를 기준으로 Date 객체 생성
  const year = new Date().getFullYear();

  return new Date(year, month, day, hours, minutes, seconds);
}
