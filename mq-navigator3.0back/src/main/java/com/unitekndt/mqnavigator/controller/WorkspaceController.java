package com.unitekndt.mqnavigator.controller;

import com.unitekndt.mqnavigator.dto.IChannel;
import com.unitekndt.mqnavigator.dto.IWorkspace;
import com.unitekndt.mqnavigator.dto.WorkspaceCreationRequest;
import com.unitekndt.mqnavigator.entity.Channel;
import com.unitekndt.mqnavigator.entity.User; // 사용자 엔티티
import com.unitekndt.mqnavigator.entity.Workspace;
import com.unitekndt.mqnavigator.service.ChannelService;
import com.unitekndt.mqnavigator.service.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/workspaces")
public class WorkspaceController {

    @Autowired
    private WorkspaceService workspaceService;
    @Autowired
    private ChannelService channelService;

    // 현재 로그인한 사용자가 속한 워크스페이스 목록을 조회
    @GetMapping
    public ResponseEntity<List<Workspace>> getWorkspacesForUser(@AuthenticationPrincipal User currentUser) {
        List<Workspace> workspaces = workspaceService.getWorkspacesByUser(currentUser.getId());
        return ResponseEntity.ok(workspaces);
    }

    // 워크스페이스 생성
    @PostMapping
    @Transactional
    public ResponseEntity<IWorkspace> createWorkspace(
            @RequestBody WorkspaceCreationRequest request,
            @AuthenticationPrincipal User currentUser) {

        // 기존 워크스페이스 URL이 사용 중인지 확인
        Optional<Workspace> existingWorkspace = workspaceService.findByUrl(request.getUrl());
        if (existingWorkspace.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 이미 사용 중인 URL인 경우
        }

        // 워크스페이스 생성
        Workspace newWorkspace = new Workspace();
        newWorkspace.setName(request.getWorkspace());
        newWorkspace.setUrl(request.getUrl());
        newWorkspace.setOwner(currentUser);

        Set<User> members = new HashSet<>();
        members.add(currentUser);
        newWorkspace.setMembers(members);

        // 워크스페이스 저장
        Workspace createdWorkspace = workspaceService.createWorkspace(newWorkspace);

        // 기본 채널 생성
        Channel defaultChannel = new Channel();
        defaultChannel.setName("일반");
        defaultChannel.setWorkspace(createdWorkspace);
        defaultChannel.setMembers(members); // 채널에도 사용자를 멤버로 추가

        // 채널 저장
        channelService.createChannel(defaultChannel);

        // IWorkspaceDto로 변환하여 반환
        IWorkspace workspaceDto = new IWorkspace(
                createdWorkspace.getId(),
                createdWorkspace.getName(),
                createdWorkspace.getUrl(),
                currentUser.getId()
        );

        return ResponseEntity.ok(workspaceDto);
    }

    // 현재 로그인한 사용자가 속한 워크스페이스의 채널 목록 조회
    @GetMapping("/{workspaceUrl}/channels")
    public ResponseEntity<List<IChannel>> getUserChannels(
            @PathVariable String workspaceUrl,
            @AuthenticationPrincipal User currentUser) {

        // 서비스에서 워크스페이스 URL과 사용자 ID로 채널 리스트를 가져옴
        List<IChannel> userChannels = workspaceService.getUserChannels(workspaceUrl, currentUser.getId());

        return ResponseEntity.ok(userChannels);
    }





    @GetMapping("/{id}")
    public ResponseEntity<Workspace> getWorkspaceById(@PathVariable Long id) {
        Workspace workspace = workspaceService.getWorkspaceById(id);
        return workspace != null ? ResponseEntity.ok(workspace) : ResponseEntity.notFound().build();
    }

    @GetMapping("/url/{url}")
    public ResponseEntity<Workspace> getWorkspaceByUrl(@PathVariable String url) {
        Optional<Workspace> workspace = workspaceService.getWorkspaceByUrl(url);
        return workspace.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Workspace> createWorkspace(@RequestBody Workspace workspace) {
        Workspace createdWorkspace = workspaceService.createWorkspace(workspace);
        return ResponseEntity.ok(createdWorkspace);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Workspace> updateWorkspace(@PathVariable Long id, @RequestBody Workspace updatedWorkspace) {
        Workspace workspace = workspaceService.updateWorkspace(id, updatedWorkspace);
        return workspace != null ? ResponseEntity.ok(workspace) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkspace(@PathVariable Long id) {
        workspaceService.deleteWorkspace(id);
        return ResponseEntity.noContent().build();
    }
}