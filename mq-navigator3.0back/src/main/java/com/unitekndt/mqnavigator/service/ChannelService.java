package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.dto.IChannel;
import com.unitekndt.mqnavigator.dto.IChat;
import com.unitekndt.mqnavigator.entity.Channel;
import com.unitekndt.mqnavigator.entity.ChannelChat;
import com.unitekndt.mqnavigator.entity.User;
import com.unitekndt.mqnavigator.entity.Workspace;
import com.unitekndt.mqnavigator.repository.ChannelChatRepository;
import com.unitekndt.mqnavigator.repository.ChannelRepository;
import com.unitekndt.mqnavigator.repository.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChannelService {

    @Autowired
    private ChannelRepository channelRepository;
    @Autowired
    private WorkspaceRepository workspaceRepository;
    @Autowired
    private ChannelChatService channelChatService;
    @Autowired
    private ChannelChatRepository channelChatRepository;

    public IChannel entityToDto(Channel channel) {
        return new IChannel(
                channel.getId(),
                channel.getName(),
                channel.getIsPrivate(),
                channel.getWorkspace().getId()
        );
    }

    // 채널 생성
    public Channel createChannel(Channel channel) {
        return channelRepository.save(channel);
    }

    @Transactional
    public IChannel createChannelInWorkspace(String workspaceUrl, String channelName, User currentUser) {

        // 워크스페이스를 URL로 검색
        Workspace workspace = workspaceRepository.findByUrl(workspaceUrl)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 워크스페이스입니다."));

        // 동일한 채널 이름이 존재하는지 확인
        if (workspace.getChannels().stream().anyMatch(c -> c.getName().equals(channelName))) {
            throw new RuntimeException("이미 존재하는 채널 이름입니다.");
        }

        // 채널 생성
        Channel newChannel = new Channel();
        newChannel.setName(channelName);
        newChannel.setWorkspace(workspace);
        newChannel.getMembers().add(currentUser); // 생성된 채널에 현재 사용자 추가

        // 채널 저장
        Channel savedChannel = channelRepository.save(newChannel);

        // DTO로 변환하여 반환
        return entityToDto(savedChannel);
    }

    // 특정 워크스페이스 내의 특정 채널 정보를 가져오는 메서드
    public IChannel getChannelInWorkspace(String workspaceUrl, String channelName) {

        // 워크스페이스 URL을 기반으로 워크스페이스를 조회
        Workspace workspace = workspaceRepository.findByUrl(workspaceUrl)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 워크스페이스입니다."));

        // 워크스페이스 내에서 해당 이름을 가진 채널을 찾기
        Channel channel = workspace.getChannels().stream()
                .filter(c -> c.getName().equals(channelName))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("존재하지 않는 채널입니다."));

        // 채널 엔티티를 IChannel DTO로 변환하여 반환
        return entityToDto(channel);
    }


    // 특정 워크스페이스의 특정 채널에 속한 채팅 메시지 가져오기
    public List<IChat> getChatsInChannel(String workspaceUrl, String channelName, int perPage, int page) {
        // 워크스페이스 URL을 기준으로 워크스페이스를 조회
        Workspace workspace = workspaceRepository.findByUrl(workspaceUrl)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 워크스페이스입니다."));

        // 해당 워크스페이스 내에서 채널 이름을 기반으로 채널을 조회
        Channel channel = workspace.getChannels().stream()
                .filter(c -> c.getName().equals(channelName))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("존재하지 않는 채널입니다."));

        // 채널에 속한 채팅 메시지들을 페이지네이션하여 가져옴
        Pageable pageable = PageRequest.of(page - 1, perPage, Sort.by("createdAt").descending());
        List<ChannelChat> chats = channelChatRepository.findByChannel(channel, pageable);

        // 채팅 메시지들을 IChat DTO로 변환
        return chats.stream()
                .map((chat) -> channelChatService.entityToDto(chat))
                .collect(Collectors.toList());
    }


    // 특정 워크스페이스와 채널에서 안 읽은 채팅 메시지 개수 가져오기
    public Long getUnreadCount(String workspaceUrl, String channelName, Long afterTimestamp) {
        // 워크스페이스 URL을 기준으로 워크스페이스를 조회
        Workspace workspace = workspaceRepository.findByUrl(workspaceUrl)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 워크스페이스입니다."));

        // 워크스페이스 내에서 채널 이름을 기준으로 채널 조회
        Channel channel = workspace.getChannels().stream()
                .filter(c -> c.getName().equals(channelName))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("존재하지 않는 채널입니다."));

        // afterTimestamp를 LocalDateTime으로 변환
        LocalDateTime afterDateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(afterTimestamp), ZoneId.systemDefault());

        // 채널 내에서 afterTimestamp 이후에 생성된 채팅 메시지 개수 계산
        return channelChatRepository.countByChannelAndCreatedAtAfter(channel, afterDateTime);
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
