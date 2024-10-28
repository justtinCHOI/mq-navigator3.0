import React, { useRef, useEffect } from 'react';
import Sortable from 'sortablejs'; // SortableJS import
import {
  Content,
  ContentLineInput,
  ContentLineText,
  ContentRow,
  LeftContent,
  RightContent,
} from '@components/Playbar/styles';
import { IRoute } from '@typings/db';

interface RouteSettingProps {
  routes: IRoute[];
  handleSettingChange?: (index: number, updatedRouteName: string) => void;
}

const RouteSetting: React.FC<RouteSettingProps> = ({ routes, handleSettingChange }) => {
  const rightContentRef = useRef<HTMLDivElement>(null); // Ref 생성

  useEffect(() => {
    if (rightContentRef.current) {
      Sortable.create(rightContentRef.current, {
        animation: 150, // 드래그 시 애니메이션 적용
        ghostClass: 'sortable-ghost', // 드래그 중 요소의 스타일 변경
      });
    }
  }, []);

  return (
    <Content>
      <ContentRow>
        <LeftContent>
          <Content>
            <ContentLineText>Routes</ContentLineText>
          </Content>
        </LeftContent>
        <RightContent ref={rightContentRef}>
          {routes.map((route, index) => (
            <ContentLineInput
              key={index + 1}
              defaultValue={route.name}
              onChange={(e) => handleSettingChange && handleSettingChange(index, e.target.value)}
            />
          ))}
        </RightContent>
      </ContentRow>
    </Content>
  );
};

export default RouteSetting;
