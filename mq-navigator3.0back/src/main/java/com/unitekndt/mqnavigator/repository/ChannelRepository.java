package com.unitekndt.mqnavigator.repository;

import com.unitekndt.mqnavigator.entity.Channel;
import com.unitekndt.mqnavigator.entity.User;
import com.unitekndt.mqnavigator.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChannelRepository extends JpaRepository<Channel, Long> {
    List<Channel> findByWorkspace(Workspace workspace);
    List<Channel> findByName(String name);
    List<Channel> findAllByWorkspaceAndMembersContains(Workspace workspace, User user);
    // 특정 워크스페이스에서 사용자가 속한 채널 리스트를 조회
    List<Channel> findAllByWorkspaceAndMembersId(Workspace workspace, Long userId);
}