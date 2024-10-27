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

    @PostMapping("/{workspaceUrl}")
    public ResponseEntity<ISetting> updateSetting(@RequestHeader("Authorization") String authHeader,
                                                  @PathVariable String workspaceUrl,
                                                  @RequestBody ISetting newSetting) {
        String token = authHeader.substring(7); // "Bearer " 제거
        Member member = tokenService.getUserFromToken(token);

        ISetting updatedSetting = settingService.updateSettingByWorkspaceUrl(workspaceUrl, member, newSetting);
        if (updatedSetting == null) {
            log.info("SettingController -> update failed, setting not found or no permission");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        log.info("SettingController -> setting updated successfully");
        return ResponseEntity.ok(updatedSetting);
    }

}
