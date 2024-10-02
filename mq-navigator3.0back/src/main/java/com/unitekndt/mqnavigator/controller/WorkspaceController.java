package com.unitekndt.mqnavigator.controller;

import com.unitekndt.mqnavigator.entity.Workspace;
import com.unitekndt.mqnavigator.service.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/workspaces")
public class WorkspaceController {

    @Autowired
    private WorkspaceService workspaceService;

    @GetMapping
    public ResponseEntity<List<Workspace>> getAllWorkspaces() {
        List<Workspace> workspaces = workspaceService.getAllWorkspaces();
        return ResponseEntity.ok(workspaces);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Workspace> getWorkspaceById(@PathVariable Long id) {
        Workspace workspace = workspaceService.getWorkspaceById(id);
        return workspace != null ? ResponseEntity.ok(workspace) : ResponseEntity.notFound().build();
    }

    @GetMapping("/url/{url}")
    public ResponseEntity<Workspace> getWorkspaceByUrl(@PathVariable String url) {
        Optional<Workspace> workspace = workspaceService.getWorkspaceByUrl(url);
        return workspace.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Workspace> createWorkspace(@RequestBody Workspace workspace) {
        Workspace createdWorkspace = workspaceService.createWorkspace(workspace);
        return ResponseEntity.ok(createdWorkspace);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Workspace> updateWorkspace(@PathVariable Long id, @RequestBody Workspace updatedWorkspace) {
        Workspace workspace = workspaceService.updateWorkspace(id, updatedWorkspace);
        return workspace != null ? ResponseEntity.ok(workspace) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkspace(@PathVariable Long id) {
        workspaceService.deleteWorkspace(id);
        return ResponseEntity.noContent().build();
    }
}