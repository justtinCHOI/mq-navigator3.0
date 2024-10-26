package com.unitekndt.mqnavigator.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.unitekndt.mqnavigator.entity.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@Builder
@ToString
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ISetting {
    private Long id;
    private Long workspaceId;
    private ColorSetting colorSetting;
    private RefreshInterval refreshInterval;
    private ToleranceRange toleranceRange;
    private SpeedPredictionInterval speedPredictionInterval;
    private List<DisplaySection> displaySections;
    private List<SectionData> sectionDatas;
}
