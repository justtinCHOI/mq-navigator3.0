package com.unitekndt.mqnavigator.repository;

import com.unitekndt.mqnavigator.entities.Channel;
import com.unitekndt.mqnavigator.entities.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChannelRepository extends JpaRepository<Channel, Long> {
    List<Channel> findByWorkspace(Workspace workspace);
}