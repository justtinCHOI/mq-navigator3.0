package com.unitekndt.mqnavigator.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
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

    @JsonCreator
    public ISetting(
            @JsonProperty("id") Long id,
            @JsonProperty("workspaceId") Long workspaceId,
            @JsonProperty("colorSetting") ColorSetting colorSetting,
            @JsonProperty("refreshInterval") RefreshInterval refreshInterval,
            @JsonProperty("toleranceRange") ToleranceRange toleranceRange,
            @JsonProperty("speedPredictionInterval") SpeedPredictionInterval speedPredictionInterval,
            @JsonProperty("displaySections") List<DisplaySection> displaySections,
            @JsonProperty("sectionDatas") List<SectionData> sectionDatas
    ) {
        this.id = id;
        this.workspaceId = workspaceId;
        this.colorSetting = colorSetting;
        this.refreshInterval = refreshInterval;
        this.toleranceRange = toleranceRange;
        this.speedPredictionInterval = speedPredictionInterval;
        this.displaySections = displaySections;
        this.sectionDatas = sectionDatas;
    }
}
