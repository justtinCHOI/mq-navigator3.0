package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.dto.IChannel;
import com.unitekndt.mqnavigator.entity.Channel;
import com.unitekndt.mqnavigator.entity.Workspace;
import com.unitekndt.mqnavigator.repository.ChannelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChannelService {

    @Autowired
    private ChannelRepository channelRepository;

    // 채널 생성
    public Channel createChannel(Channel channel) {
        return channelRepository.save(channel);
    }

    public IChannel entityToDto(Channel channel) {
        return new IChannel(
                channel.getId(),
                channel.getName(),
                channel.getIsPrivate(),
                channel.getWorkspace().getId()
        );
    }







    public List<Channel> getChannelsByWorkspace(Workspace workspace) {
        return channelRepository.findByWorkspace(workspace);
    }

    public Channel saveChannel(Channel channel) {
        return channelRepository.save(channel);
    }

    public List<Channel> getAllChannels() {
        return channelRepository.findAll();
    }

    public Optional<Channel> getChannelById(Long channelId) {
        return channelRepository.findById(channelId);
    }

    public void deleteChannel(Long channelId) {
        channelRepository.deleteById(channelId);
    }

    public List<Channel> getChannelsByName(String name) {
        return channelRepository.findByName(name);
    }
}
