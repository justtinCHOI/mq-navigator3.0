package com.unitekndt.mqnavigator.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Setting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "setting", fetch = FetchType.LAZY)
    private Workspace workspace;

    @Embedded
    private ColorSetting colorSetting;

    @Enumerated(EnumType.STRING)
    private RefreshInterval refreshInterval;

    @Enumerated(EnumType.STRING)
    private ToleranceRange toleranceRange;

    @Enumerated(EnumType.STRING)
    private SpeedPredictionInterval speedPredictionInterval;

    @ElementCollection
    @CollectionTable(name = "setting_display_sections", joinColumns = @JoinColumn(name = "setting_id"))
    private List<DisplaySection> displaySections = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "setting_section_data", joinColumns = @JoinColumn(name = "setting_id"))
    private List<SectionData> sectionDatas = new ArrayList<>();


}
