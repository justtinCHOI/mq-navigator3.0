package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.entities.Channel;
import com.unitekndt.mqnavigator.entities.Workspace;
import com.unitekndt.mqnavigator.repository.ChannelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChannelService {

    @Autowired
    private ChannelRepository channelRepository;

    public List<Channel> getChannelsByWorkspace(Workspace workspace) {
        return channelRepository.findByWorkspace(workspace);
    }

    public Channel saveChannel(Channel channel) {
        return channelRepository.save(channel);
    }
}
