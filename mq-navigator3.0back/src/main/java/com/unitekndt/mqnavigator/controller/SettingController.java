package com.unitekndt.mqnavigator.controller;

import com.unitekndt.mqnavigator.dto.ISetting;
import com.unitekndt.mqnavigator.entity.Member;
import com.unitekndt.mqnavigator.service.SettingService;
import com.unitekndt.mqnavigator.service.TokenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/setting")
public class SettingController {

    private final SettingService settingService;
    private final TokenService tokenService;

    public SettingController(SettingService settingService, TokenService tokenService) {
        this.settingService = settingService;
        this.tokenService = tokenService;
    }

    @GetMapping("/{workspaceUrl}")
    public ResponseEntity<ISetting> getSetting(@RequestHeader("Authorization") String authHeader, @PathVariable String workspaceUrl) {
        String token = authHeader.substring(7); // "Bearer " 제거
        Member member = tokenService.getUserFromToken(token);

        // SettingService를 통해 설정 정보 조회
        ISetting setting = settingService.getSettingByWorkspaceUrlAndMember(workspaceUrl, member);

        if (setting == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok(setting);
    }
}
