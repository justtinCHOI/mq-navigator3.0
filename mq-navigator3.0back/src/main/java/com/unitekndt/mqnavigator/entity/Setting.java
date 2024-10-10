package com.unitekndt.mqnavigator.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@Entity
public class Setting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Embedded
    private ColorSetting colorSetting;

    @Enumerated(EnumType.STRING)
    private RefreshInterval refreshInterval;

    @Enumerated(EnumType.STRING)
    private SpeedPredictionInterval speedPredictionInterval;

    @ElementCollection
    @CollectionTable(name = "setting_display_sections", joinColumns = @JoinColumn(name = "setting_id"))
    private List<DisplaySection> displaySections;

    @ElementCollection
    @CollectionTable(name = "setting_section_data", joinColumns = @JoinColumn(name = "setting_id"))
    private List<SectionData> sectionDatas;
}
