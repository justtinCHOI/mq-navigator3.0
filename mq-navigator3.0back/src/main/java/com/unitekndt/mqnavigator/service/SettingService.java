package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.dto.ISetting;
import com.unitekndt.mqnavigator.entity.Member;
import com.unitekndt.mqnavigator.entity.Setting;
import com.unitekndt.mqnavigator.entity.Workspace;
import com.unitekndt.mqnavigator.repository.SettingRepository;
import com.unitekndt.mqnavigator.repository.WorkspaceRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class SettingService {

    private final WorkspaceRepository workspaceRepository;
    private final SettingRepository settingRepository;

    public SettingService(WorkspaceRepository workspaceRepository, SettingRepository settingRepository) {
        this.workspaceRepository = workspaceRepository;
        this.settingRepository = settingRepository;
    }

    public ISetting getSettingByWorkspaceUrlAndMember(String workspaceUrl, Member member) {
        // workspaceUrl로 Workspace를 찾음
        Workspace workspace = workspaceRepository.findByUrl(workspaceUrl);
        log.info("Setting Service workspace : {}", workspace);

        if (workspace == null || !workspace.getMembers().contains(member)) {
            return null; // workspace가 없거나 권한이 없을 경우 null 반환
        }

        // Workspace에서 Setting 조회
        Setting setting = workspace.getSetting();

        if (setting == null) {
            log.info("Setting Service setting : null");
            return null; // 설정이 없는 경우 null 반환
        }
        log.info("Setting Service setting : {}", setting.toString());
        log.info("Setting Service displaySections : {}", setting.getDisplaySections());
        log.info("Setting Service sectionDatas : {}", setting.getSectionDatas());

        // Setting을 DTO로 변환하여 반환
        return entityToDto(setting);
    }

    public ISetting updateSettingByWorkspaceUrl(String workspaceUrl, Member member, ISetting newSetting) {
        Workspace workspace = workspaceRepository.findByUrl(workspaceUrl);
        if (workspace == null || !workspace.getMembers().contains(member)) {
            return null;
        }

        Setting existingSetting = workspace.getSetting();
        if (existingSetting == null) {
            log.info("Setting Service -> existing setting not found");
            return null;
        }

        updateEntityFromDto(existingSetting, newSetting);
        settingRepository.save(existingSetting);

        return entityToDto(existingSetting);
    }

    private ISetting entityToDto(Setting setting) {
        return ISetting.builder()
                .id(setting.getId())
                .workspaceId(setting.getWorkspace().getId())
                .colorSetting(setting.getColorSetting())
                .refreshInterval(setting.getRefreshInterval())
                .toleranceRange(setting.getToleranceRange())
                .speedPredictionInterval(setting.getSpeedPredictionInterval())
                .displaySections(setting.getDisplaySections())
                .sectionDatas(setting.getSectionDatas())
                .build();
    }

    private void updateEntityFromDto(Setting setting, ISetting newSetting) {
        setting.setColorSetting(newSetting.getColorSetting());
        setting.setRefreshInterval(newSetting.getRefreshInterval());
        setting.setToleranceRange(newSetting.getToleranceRange());
        setting.setSpeedPredictionInterval(newSetting.getSpeedPredictionInterval());
        setting.setDisplaySections(newSetting.getDisplaySections());
        setting.setSectionDatas(newSetting.getSectionDatas());
    }
}
