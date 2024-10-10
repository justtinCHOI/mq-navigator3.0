package com.unitekndt.mqnavigator.entity;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class ColorSetting {
    private Color initialColor;
    private Color decelerationColor;
    private Color constantSpeedColor;
    private Color accelerationColor;
}
