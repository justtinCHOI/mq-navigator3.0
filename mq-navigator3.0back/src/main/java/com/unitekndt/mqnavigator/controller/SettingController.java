package com.unitekndt.mqnavigator.controller;

import com.unitekndt.mqnavigator.dto.ISetting;
import com.unitekndt.mqnavigator.entity.Member;
import com.unitekndt.mqnavigator.service.SettingService;
import com.unitekndt.mqnavigator.service.TokenService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/api/setting")
public class SettingController {

    private final SettingService settingService;
    private final TokenService tokenService;

    public SettingController(SettingService settingService, TokenService tokenService) {
        this.settingService = settingService;
        this.tokenService = tokenService;
    }

    @GetMapping(value = "/{workspaceUrl}")
    public ResponseEntity<ISetting> getSetting(@RequestHeader("Authorization") String authHeader, @PathVariable String workspaceUrl) {
        String token = authHeader.substring(7); // "Bearer " 제거
        Member member = tokenService.getUserFromToken(token);

        // SettingService를 통해 설정 정보 조회
        ISetting setting = settingService.getSettingByWorkspaceUrlAndMember(workspaceUrl, member);

        if (setting == null) {
            log.info("SettingController -> setting is null");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        log.info("SettingController -> setting is not null");

        return ResponseEntity.ok(setting);
    }

}

//    @GetMapping( "/{workspaceUrl}")
//    public Map<String, Object> getSetting(@RequestHeader("Authorization") String authHeader, @PathVariable String workspaceUrl) {
//        String token = authHeader.substring(7); // "Bearer " 제거
//        Member member = tokenService.getUserFromToken(token);
//
//        // SettingService를 통해 설정 정보 조회
//        ISetting settingDto = settingService.getSettingByWorkspaceUrlAndMember(workspaceUrl, member);
//
//        Map<String, Object> map = new HashMap<>();
//        map.put("id", settingDto.getId());
//        map.put("workspaceId", settingDto.getWorkspaceId());
//        map.put("colorSetting", settingDto.getColorSetting());
//        map.put("refreshInterval", settingDto.getRefreshInterval());
//        map.put("toleranceRange", settingDto.getToleranceRange());
//        map.put("speedPredictionInterval", settingDto.getSpeedPredictionInterval());
//        map.put("displaySections", settingDto.getDisplaySections());
//        map.put("sectionDatas", settingDto.getSectionDatas());
//
//        return map;
//    }

//        log.info("SettingController setting.getId() : {} ", settingDto.getId());
//        log.info("SettingController setting.getWorkspaceId() : {} ", settingDto.getWorkspaceId());
//        log.info("SettingController setting.getColorSetting() : {} ", settingDto.getColorSetting());
//        log.info("SettingController setting.getRefreshInterval() : {} ", settingDto.getRefreshInterval());
//        log.info("SettingController setting.getToleranceRange() : {} ", settingDto.getToleranceRange());
//        log.info("SettingController setting.getSpeedPredictionInterval() : {} ", settingDto.getSpeedPredictionInterval());
//        log.info("SettingController setting.getDisplaySections() : {} ", settingDto.getDisplaySections());
//        log.info("SettingController setting.getSectionDatas() : {} ", settingDto.getSectionDatas());


//    @GetMapping(value = "/{workspaceUrl}", produces = MediaType.APPLICATION_JSON_VALUE)
//    @GetMapping( "/{workspaceUrl}")
//    public ISetting getSetting(@RequestHeader("Authorization") String authHeader, @PathVariable String workspaceUrl) {
//        String token = authHeader.substring(7); // "Bearer " 제거
//        Member member = tokenService.getUserFromToken(token);
//
//        // SettingService를 통해 설정 정보 조회
//        ISetting settingDto = settingService.getSettingByWorkspaceUrlAndMember(workspaceUrl, member);
//        log.info("SettingController setting : {} ", settingDto.toString());
//
//        return settingDto;
//    }