import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';

// 페이지 이동과 관련된 커스텀 훅
function UseCustomMove() {
  const navigate = useNavigate();
  const { url } = useParams<{ url: string }>();

  // 분석 페이지로 이동
  const moveToAnalyze = (): void => {
    navigate({ pathname: `/workspace/${url}/analyze` });
  };

  // 분석 페이지로 이동
  const moveToAnalyzeWithParam = (url: string): void => {
    navigate({ pathname: `/workspace/${url}/analyze` });
  };

  // 설정 페이지로 이동
  const moveToSetting = (): void => {
    navigate({ pathname: `/workspace/${url}/setting` });
  };

  // 설정 페이지로 이동
  const moveToSettingWithParam = (url: string): void => {
    navigate({ pathname: `/workspace/${url}/setting` });
  };

  return { moveToAnalyze, moveToAnalyzeWithParam, moveToSetting, moveToSettingWithParam };
}

export default UseCustomMove;
