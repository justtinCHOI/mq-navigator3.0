package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.entity.Workspace;
import com.unitekndt.mqnavigator.repository.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkspaceService {

    @Autowired
    private WorkspaceRepository workspaceRepository;

    public List<Workspace> getAllWorkspaces() {
        return workspaceRepository.findAll();
    }

    public Workspace getWorkspaceById(Long id) {
        Optional<Workspace> workspace = workspaceRepository.findById(id);
        return workspace.orElse(null); // Handle nulls appropriately in production
    }

    public Optional<Workspace> getWorkspaceByUrl(String url) {
        return workspaceRepository.findByUrl(url);
    }

    public Workspace createWorkspace(Workspace workspace) {
        return workspaceRepository.save(workspace);
    }

    public Workspace updateWorkspace(Long id, Workspace updatedWorkspace) {
        return workspaceRepository.findById(id).map(workspace -> {
            workspace.setName(updatedWorkspace.getName());
            workspace.setUrl(updatedWorkspace.getUrl());
            return workspaceRepository.save(workspace);
        }).orElse(null); // Handle nulls in production
    }

    public void deleteWorkspace(Long id) {
        workspaceRepository.deleteById(id);
    }
}