package com.unitekndt.mqnavigator.dto;

import com.unitekndt.mqnavigator.entity.*;

import java.util.List;

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
