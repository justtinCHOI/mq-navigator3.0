import React, { useRef, useEffect } from 'react';
import Sortable from 'sortablejs'; // SortableJS import
import {
  Content,
  ContentLineInput,
  ContentLineText,
  ContentRow,
  LeftContent,
  RightContent,
} from '@components/PlayList/styles';

const RouteSetting = () => {
  const rightContentRef = useRef<HTMLDivElement>(null); // Ref 생성

  useEffect(() => {
    if (rightContentRef.current) {
      // SortableJS를 rightContent에 적용
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
        <RightContent ref={rightContentRef}> {/* RightContent에 ref 추가 */}
          {Array.from({ length: 4 }, (_, index) => {
            const RouteName = 'Route' + (index + 1);
            return (
              <ContentLineInput
                key={index + 1}
                className="width180px"
                defaultValue={RouteName}
              />
            );
          })}
        </RightContent>
      </ContentRow>
    </Content>
  );
};

export default RouteSetting;
