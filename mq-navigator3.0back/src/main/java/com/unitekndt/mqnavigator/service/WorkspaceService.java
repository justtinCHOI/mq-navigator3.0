package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.dto.IChannel;
import com.unitekndt.mqnavigator.dto.IChannelDto;
import com.unitekndt.mqnavigator.dto.IWorkspace;
import com.unitekndt.mqnavigator.entity.Channel;
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
    private ChannelRepository channelRepository;

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

    public IWorkspace entityToDto(Workspace workspace) {
        return new IWorkspace(
                workspace.getId(),
                workspace.getName(),
                workspace.getUrl(),
                workspace.getOwner().getId()
        );
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