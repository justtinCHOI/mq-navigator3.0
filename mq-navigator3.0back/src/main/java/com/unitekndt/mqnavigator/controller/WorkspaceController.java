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

import java.util.List;

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
        String token = authHeader.substring(7);
        Member member = tokenService.getUserFromToken(token);

        IWorkspace workspace = workspaceService.getWorkspaceByUrlAndMember(workspaceUrl, member);
        return workspace != null
                ? ResponseEntity.ok(workspace)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/")
    public ResponseEntity<IWorkspace> updateWorkspace(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody IWorkspace workspace) {
        String token = authHeader.substring(7);
        Member member = tokenService.getUserFromToken(token);

        IWorkspace updatedWorkspace = workspaceService.updateWorkspace(workspace, member);
        return updatedWorkspace != null
                ? ResponseEntity.ok(updatedWorkspace)
                : ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @PostMapping("/create")
    public ResponseEntity<IWorkspace> createWorkspace(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody IWorkspace newWorkspace) {
        String token = authHeader.substring(7);
        Member member = tokenService.getUserFromToken(token);

        IWorkspace createdWorkspace = workspaceService.createWorkspace(newWorkspace, member);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdWorkspace);
    }

    @PostMapping("/{workspaceUrl}/route")
    public ResponseEntity<IRoute> addRoute(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable String workspaceUrl,
            @RequestBody IRoute route) {
        String token = authHeader.substring(7);
        Member member = tokenService.getUserFromToken(token);

        IRoute newRoute = workspaceService.addRouteToWorkspace(workspaceUrl, route, member);
        return newRoute != null
                ? ResponseEntity.ok(newRoute)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
