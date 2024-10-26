package com.unitekndt.mqnavigator.controller;

import com.unitekndt.mqnavigator.dto.IGate;
import com.unitekndt.mqnavigator.service.GateService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/gate")
public class GateController {

    @Autowired
    private GateService gateService;

    @GetMapping("/{workspaceUrl}")
    public List<IGate> getGates(@RequestHeader("Authorization") String authHeader, @PathVariable String workspaceUrl) {
        String token = authHeader.substring(7); // "Bearer " 제거
        List<IGate> gates = gateService.getGatesByWorkspaceUrl(token, workspaceUrl);
        log.info("GateController gates: " + gates);
        return gates;
    }
}
