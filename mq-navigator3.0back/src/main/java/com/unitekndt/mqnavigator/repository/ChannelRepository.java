package com.unitekndt.mqnavigator.repository;

import com.unitekndt.mqnavigator.entity.Channel;
import com.unitekndt.mqnavigator.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChannelRepository extends JpaRepository<Channel, Long> {
    List<Channel> findByWorkspace(Workspace workspace);
    // 채널 이름으로 검색 (추가적인 검색 기능이 필요하면 여기에 정의)
    List<Channel> findByName(String name);
}