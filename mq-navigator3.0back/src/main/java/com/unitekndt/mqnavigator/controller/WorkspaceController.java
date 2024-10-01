package com.unitekndt.mqnavigator.controller;

import com.unitekndt.mqnavigator.entities.Workspace;
import com.unitekndt.mqnavigator.service.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workspaces")
public class WorkspaceController {

    @Autowired
    private WorkspaceService workspaceService;

    @GetMapping("/{url}")
    public ResponseEntity<Workspace> getWorkspaceByUrl(@PathVariable String url) {
        return workspaceService.findWorkspaceByUrl(url)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Workspace> createWorkspace(@RequestBody Workspace workspace) {
        return ResponseEntity.ok(workspaceService.saveWorkspace(workspace));
    }
}
