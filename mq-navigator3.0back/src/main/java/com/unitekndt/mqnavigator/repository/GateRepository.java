package com.unitekndt.mqnavigator.repository;

import com.unitekndt.mqnavigator.entity.Gate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GateRepository extends JpaRepository<Gate, Long> {
    List<Gate> findByWorkspaceUrl(String workspaceUrl);
}
