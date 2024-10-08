package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.dto.IChannel;
import com.unitekndt.mqnavigator.dto.IWorkspace;
import com.unitekndt.mqnavigator.dto.WorkspaceCreationRequest;
import com.unitekndt.mqnavigator.entity.Channel;
import com.unitekndt.mqnavigator.entity.User;
import com.unitekndt.mqnavigator.entity.Workspace;
import com.unitekndt.mqnavigator.repository.ChannelRepository;
import com.unitekndt.mqnavigator.repository.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WorkspaceService {

    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Autowired
    private ChannelService channelService;

    @Autowired
    private ChannelRepository channelRepository;

    // 사용자 ID로 워크스페이스 목록을 조회하고, DTO로 변환하여 반환
    public List<IWorkspace> getWorkspacesByUserDto(Long userId) {
        List<Workspace> workspaces = workspaceRepository.findAllByMembersId(userId);
        return workspaces.stream()
                .map(this::entityToDto) // entityToDto() 메서드를 사용해 변환
                .collect(Collectors.toList());
    }

    // 워크스페이스 생성하고 DTO로 변환하여 반환
    public IWorkspace createWorkspaceDto(WorkspaceCreationRequest request, User currentUser) {
        Optional<Workspace> existingWorkspace = workspaceRepository.findByUrl(request.getUrl());
        if (existingWorkspace.isPresent()) {
            throw new RuntimeException("이미 사용 중인 URL입니다."); // 예외 처리
        }

        Workspace newWorkspace = new Workspace();
        newWorkspace.setName(request.getWorkspace());
        newWorkspace.setUrl(request.getUrl());
        newWorkspace.setOwner(currentUser);

        // 사용자를 멤버로 추가
        newWorkspace.getMembers().add(currentUser);

        // 워크스페이스 저장
        Workspace createdWorkspace = workspaceRepository.save(newWorkspace);

        // 기본 채널 생성
        Channel defaultChannel = new Channel();
        defaultChannel.setName("일반");
        defaultChannel.setWorkspace(createdWorkspace);
        defaultChannel.getMembers().add(currentUser);

        // 채널 저장
        channelService.createChannel(defaultChannel);

        // 저장된 워크스페이스를 DTO로 변환하여 반환
        return entityToDto(createdWorkspace);
    }

    // 특정 워크스페이스에 속한 사용자의 채널 목록을 조회하고, DTO로 변환하여 반환
    public List<IChannel> getUserChannelsDto(String workspaceUrl, Long userId) {
        Workspace workspace = workspaceRepository.findByUrl(workspaceUrl)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 워크스페이스입니다."));

        return workspace.getChannels().stream()
                .filter(channel -> channel.getMembers().stream()
                        .anyMatch(user -> user.getId().equals(userId)))
                .map(channelService::entityToDto) // channelService의 entityToDto 사용
                .collect(Collectors.toList());
    }

    // Workspace -> IWorkspace로 변환
    public IWorkspace entityToDto(Workspace workspace) {
        return new IWorkspace(
                workspace.getId(),
                workspace.getName(),
                workspace.getUrl(),
                workspace.getOwner().getId()
        );
    }














    public List<Workspace> getWorkspacesByUser(Long userId) {
        return workspaceRepository.findByMembersUserId(userId);
    }

    // 워크스페이스 URL로 조회
    public Optional<Workspace> findByUrl(String url) {
        return workspaceRepository.findByUrl(url);
    }

    // 워크스페이스 생성
    public Workspace createWorkspace(Workspace workspace) {
        return workspaceRepository.save(workspace);
    }

    public List<IChannel> getUserChannels(String workspaceUrl, Long userId) {
        Workspace workspace = workspaceRepository.findByUrl(workspaceUrl)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 워크스페이스입니다."));

        List<Channel> userChannels = channelRepository.findAllByWorkspaceAndMembersId(workspace, userId);

        return userChannels.stream()
                .map(channel -> new IChannel(channel.getId(), channel.getName(), channel.getIsPrivate(), channel.getWorkspace().getId()))
                .collect(Collectors.toList());
    }

    public List<Workspace> getAllWorkspaces() {
        return workspaceRepository.findAll();
    }



    public Workspace getWorkspaceById(Long id) {
        Optional<Workspace> workspace = workspaceRepository.findById(id);
        return workspace.orElse(null); // Handle nulls appropriately in production
    }

    public Optional<Workspace> getWorkspaceByUrl(String url) {
        return workspaceRepository.findByUrl(url);
    }

    public Workspace updateWorkspace(Long id, Workspace updatedWorkspace) {
        return workspaceRepository.findById(id).map(workspace -> {
            workspace.setName(updatedWorkspace.getName());
            workspace.setUrl(updatedWorkspace.getUrl());
            return workspaceRepository.save(workspace);
        }).orElse(null); // Handle nulls in production
    }

    public void deleteWorkspace(Long id) {
        workspaceRepository.deleteById(id);
    }
}