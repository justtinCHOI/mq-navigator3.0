package com.unitekndt.mqnavigator.repository;

import com.unitekndt.mqnavigator.entities.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {
    Optional<Workspace> findByUrl(String url);
}