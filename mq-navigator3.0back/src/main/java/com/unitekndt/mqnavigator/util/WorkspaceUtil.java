package com.unitekndt.mqnavigator.util;

import com.unitekndt.mqnavigator.entity.*;
import com.unitekndt.mqnavigator.repository.WorkspaceRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class WorkspaceUtil {

    private final WorkspaceRepository workspaceRepository;

    public WorkspaceUtil(WorkspaceRepository workspaceRepository) {
        this.workspaceRepository = workspaceRepository;
    }

    public Workspace createDefaultWorkspace(Member member, String name, String url) {
        return Workspace.builder()
                .name(name)
                .url(url)
                .owner(member)
                .copyrightHolderId(member.getId())
                .isPublic(true)
                .useAmount(0L)
                .members(new ArrayList<>()) // members 리스트 초기화
                .route(new Route())
                .routes(new ArrayList<>())
                .gates(new ArrayList<>())
                .setting(createDefaultSetting())
                .build();
    }

    public Route createDefaultRoute(Member member, Workspace workspace) {
        return Route.builder()
                .name("Seoul Route")
                .coordinates(createDefaultCoordinates())
                .workspace(workspace)
                .copyrightHolderId(member.getId()) // 소유자의 ID를 저작권자로 설정
                .isPublic(true)
                .useAmount(0L)
                .build();
    }

    public Setting createDefaultSetting() {
        return Setting.builder()
                .colorSetting(createDefaultColorSetting())
                .refreshInterval(RefreshInterval.ONE)
                .toleranceRange(ToleranceRange.FIVE)
                .speedPredictionInterval(SpeedPredictionInterval.FIRST)
                .displaySections(createDefaultDisplaySections())
                .sectionDatas(createDefaultSectionDatas())
                .build();
    }

    public List<Coordinate> createDefaultCoordinates() {
        List<Coordinate> coordinates = new ArrayList<>();
        coordinates.add(new Coordinate(37.5665, 126.9780));
        coordinates.add(new Coordinate(37.5705, 126.9810));
        coordinates.add(new Coordinate(37.5735, 126.9840));
        return coordinates;
    }

    public List<Gate> createDefaultGates(Workspace workspace, List<Coordinate> coordinates) {
        List<Gate> gates = new ArrayList<>();
        LocalDateTime time = LocalDateTime.now();

        for (int i = 0; i < coordinates.size(); i++) {
            gates.add(Gate.builder()
                    .sequence((long) i)
                    .coordinate(coordinates.get(i))
                    .time(time.plusMinutes(i * 10L))
                    .traveledDistance((long) (i * 100L))  // traveledDistance 예시
                    .workspace(workspace)
                    .build());
        }
        return gates;
    }

    private ColorSetting createDefaultColorSetting() {
        ColorSetting colorSetting = new ColorSetting();
        colorSetting.setInitialColor(Color.SKY_BLUE);
        colorSetting.setDecelerationColor(Color.PURPLE);
        colorSetting.setConstantSpeedColor(Color.LIGHT_GREEN);
        colorSetting.setAccelerationColor(Color.YELLOW);
        return colorSetting;
    }

    private List<DisplaySection> createDefaultDisplaySections() {
        List<DisplaySection> displaySections = new ArrayList<>();
        displaySections.add(new DisplaySection(Location.FIRST_GATE, Location.LAST_GATE));
        displaySections.add(new DisplaySection(Location.PREVIOUS_GATE_BASED_ON_SELECTED, Location.NEXT_GATE_BASED_ON_SELECTED));
        displaySections.add(new DisplaySection(Location.PREVIOUS_GATE_BASED_ON_CURRENT, Location.NEXT_GATE_BASED_ON_CURRENT));
        return displaySections;
    }

    private List<SectionData> createDefaultSectionDatas() {
        List<SectionData> sectionDatas = new ArrayList<>();
        sectionDatas.add(SectionData.DISTANCE);
        sectionDatas.add(SectionData.ELAPSED_TIME);
        sectionDatas.add(SectionData.ESTIMATED_TIME);
        sectionDatas.add(SectionData.ELAPSED_SPEED);
        sectionDatas.add(SectionData.ESTIMATED_SPEED);
        return sectionDatas;
    }
}
