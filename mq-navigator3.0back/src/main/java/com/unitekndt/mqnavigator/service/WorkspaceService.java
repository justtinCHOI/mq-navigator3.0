package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.entities.Workspace;
import com.unitekndt.mqnavigator.repository.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WorkspaceService {

    @Autowired
    private WorkspaceRepository workspaceRepository;

    public Optional<Workspace> findWorkspaceByUrl(String url) {
        return workspaceRepository.findByUrl(url);
    }

    public Workspace saveWorkspace(Workspace workspace) {
        return workspaceRepository.save(workspace);
    }
}
