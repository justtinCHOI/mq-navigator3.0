package com.unitekndt.mqnavigator.repository;

import com.unitekndt.mqnavigator.entity.Member;
import com.unitekndt.mqnavigator.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {

    // 이름으로 워크스페이스가 존재하는지 확인하는 메서드
    boolean existsByName(String name);

    // URL로 워크스페이스가 존재하는지 확인하는 메서드
    boolean existsByUrl(String url);

    Workspace findByUrl(String url);

    Optional<Workspace> findByUrlAndMembersContains(String url, Member member);

    Workspace findByUrlAndOwner(String url, Member owner);
}
