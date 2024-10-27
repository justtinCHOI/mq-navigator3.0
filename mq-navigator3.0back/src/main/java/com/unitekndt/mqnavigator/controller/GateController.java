package com.unitekndt.mqnavigator.controller;

import com.unitekndt.mqnavigator.dto.IGate;
import com.unitekndt.mqnavigator.service.GateService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/gate")
public class GateController {

    @Autowired
    private GateService gateService;

//    @GetMapping("/{workspaceUrl}")
//    public List<IGate> getGates(@RequestHeader("Authorization") String authHeader, @PathVariable String workspaceUrl) {
//        String token = authHeader.substring(7); // "Bearer " 제거
//        return gateService.getGatesByWorkspaceUrl(token, workspaceUrl);
//    }

    // 특정 workspace의 gate 목록 조회
    @GetMapping("/{workspaceUrl}")
    public ResponseEntity<List<IGate>> getGates(@RequestHeader("Authorization") String authHeader, @PathVariable String workspaceUrl) {
        String token = authHeader.substring(7); // "Bearer " 제거
        List<IGate> gates = gateService.getGatesByWorkspaceUrl(token, workspaceUrl);
        return ResponseEntity.ok(gates);
    }

    // gates 정보 업데이트
    @PostMapping("/{workspaceUrl}")
    public ResponseEntity<List<IGate>> updateGates(@RequestHeader("Authorization") String authHeader, @PathVariable String workspaceUrl, @RequestBody List<IGate> gates) {
        String token = authHeader.substring(7);
        List<IGate> updatedGates = gateService.updateGatesByWorkspaceUrl(token, workspaceUrl, gates);
        log.info("Gate Controller updatedGates : {}", updatedGates);
        return ResponseEntity.ok(updatedGates);
    }
}
