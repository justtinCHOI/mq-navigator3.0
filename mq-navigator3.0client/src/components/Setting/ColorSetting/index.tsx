import React from 'react';
import { Content, ContentLineText, ContentRow, LeftContent, RightContent } from '@components/Playbar/styles';
import UseSelectOptionColor from '@hooks/UseSelectOptionColor';
import { ColorSetting } from '@typings/db';

interface ColorSettingProps {
  colorSetting: ColorSetting;
  handleSettingChange: (field: string, value: string) => void;
}

const ColorsSetting: React.FC<ColorSettingProps> = ({ colorSetting, handleSettingChange }) => {
  return (
    <Content>
      <ContentRow>
        <LeftContent>
          <Content>
            <ContentLineText>Colors</ContentLineText>
          </Content>
        </LeftContent>
        <RightContent>
          <Content>
            <UseSelectOptionColor
              phase="initialColor"
              selectedColor={colorSetting.initialColor}
              handleSettingChange={(field, value) => handleSettingChange('initialColor', value)}
            />
            <UseSelectOptionColor
              phase="decelerationColor"
              selectedColor={colorSetting.decelerationColor}
              handleSettingChange={(field, value) => handleSettingChange('decelerationColor', value)}
            />
            <UseSelectOptionColor
              phase="constantSpeedColor"
              selectedColor={colorSetting.constantSpeedColor}
              handleSettingChange={(field, value) => handleSettingChange('constantSpeedColor', value)}
            />
            <UseSelectOptionColor
              phase="accelerationColor"
              selectedColor={colorSetting.accelerationColor}
              handleSettingChange={(field, value) => handleSettingChange('accelerationColor', value)}
            />
          </Content>
        </RightContent>
      </ContentRow>
    </Content>
  );
};

export default ColorsSetting;
