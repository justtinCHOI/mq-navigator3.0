package com.unitekndt.mqnavigator.repository;

import com.unitekndt.mqnavigator.entity.Channel;
import com.unitekndt.mqnavigator.entity.User;
import com.unitekndt.mqnavigator.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChannelRepository extends JpaRepository<Channel, Long> {
    List<Channel> findByWorkspace(Workspace workspace);
    List<Channel> findByName(String name);
    List<Channel> findAllByWorkspaceAndMembersContains(Workspace workspace, User user);
    List<Channel> findAllByWorkspaceAndMembersId(Workspace workspace, Long userId);
    Optional<Channel> findByNameAndWorkspace(String channelName, Workspace workspace);
}