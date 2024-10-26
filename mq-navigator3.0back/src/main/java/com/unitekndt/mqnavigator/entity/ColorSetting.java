package com.unitekndt.mqnavigator.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ColorSetting {
    private Color initialColor;
    private Color decelerationColor;
    private Color constantSpeedColor;
    private Color accelerationColor;
}
