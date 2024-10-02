package com.unitekndt.mqnavigator.repository;

import com.unitekndt.mqnavigator.entity.Channel;
import com.unitekndt.mqnavigator.entity.ChannelChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChannelChatRepository extends JpaRepository<ChannelChat, Long> {
    List<ChannelChat> findByChannel(Channel channel);
}
