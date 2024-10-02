package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.entity.Channel;
import com.unitekndt.mqnavigator.entity.ChannelChat;
import com.unitekndt.mqnavigator.repository.ChannelChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChannelChatService {

    private final ChannelChatRepository channelChatRepository;

    @Autowired
    public ChannelChatService(ChannelChatRepository channelChatRepository) {
        this.channelChatRepository = channelChatRepository;
    }

    public ChannelChat saveChannelChat(ChannelChat channelChat) {
        return channelChatRepository.save(channelChat);
    }

    public List<ChannelChat> getChannelChatsByChannel(Channel channel) {
        return channelChatRepository.findByChannel(channel);
    }
}
