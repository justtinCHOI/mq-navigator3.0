package com.unitekndt.mqnavigator.controller;

import com.unitekndt.mqnavigator.dto.IRoute;
import com.unitekndt.mqnavigator.dto.IWorkspace;
import com.unitekndt.mqnavigator.entity.Member;
import com.unitekndt.mqnavigator.service.TokenService;
import com.unitekndt.mqnavigator.service.WorkspaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/workspace")
public class WorkspaceController {

    private final WorkspaceService workspaceService;
    private final TokenService tokenService;

    @GetMapping("/{workspaceUrl}")
    public ResponseEntity<IWorkspace> getWorkspace(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String workspaceUrl) {
        Member member = tokenService.getUserFromToken(authHeader.substring(7));

        IWorkspace workspace = workspaceService.getWorkspaceByUrlAndMember(workspaceUrl, member);
        return workspace != null
                ? ResponseEntity.ok(workspace)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PutMapping("/")
    public ResponseEntity<IWorkspace> updateWorkspace(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody IWorkspace workspace) {
        Member member = tokenService.getUserFromToken(authHeader.substring(7));

        IWorkspace updatedWorkspace = workspaceService.updateWorkspace(workspace, member);
        return updatedWorkspace != null
                ? ResponseEntity.ok(updatedWorkspace)
                : ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @PostMapping("/")
    public ResponseEntity<Object> createWorkspace(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> workspaceData) {
        Member member = tokenService.getUserFromToken(authHeader.substring(7));

        String name = workspaceData.get("name");
        String url = workspaceData.get("url");

        try {
            IWorkspace createdWorkspace = workspaceService.createWorkspace(member, name, url);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdWorkspace);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/{workspaceUrl}/route")
    public ResponseEntity<IRoute> addRoute(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String workspaceUrl,
            @RequestBody IRoute route) {
        Member member = tokenService.getUserFromToken(authHeader.substring(7));

        IRoute newRoute = workspaceService.addRouteToWorkspace(workspaceUrl, route, member);
        return newRoute != null
                ? ResponseEntity.ok(newRoute)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
