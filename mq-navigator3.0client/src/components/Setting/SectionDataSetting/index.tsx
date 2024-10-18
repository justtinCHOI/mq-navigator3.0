import React, { useEffect, useRef } from 'react';
import {
  Content,
  ContentLine,
  ContentLineText,
  ContentRow,
  CustomIconButton,
  LeftContent,
  RightContent,
} from '@components/PlayList/styles';
import Sortable from 'sortablejs';
import UseSelectOptionData from '@hooks/UseSelectOptionData';

const SectionDataSetting = () => {
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
            <ContentLineText>Section Datas</ContentLineText>
          </Content>
        </LeftContent>
        <RightContent ref={rightContentRef}>
          {Array.from({ length: 4 }, (_, index) => {
            return (
              <ContentLine key={index + 1}>
                <UseSelectOptionData />
                <CustomIconButton>
                  <i className="fa-solid fa-xmark"></i>
                </CustomIconButton>
              </ContentLine>
            );
          })}
        </RightContent>
      </ContentRow>
    </Content>
  );
};

export default SectionDataSetting;
