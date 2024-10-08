package com.unitekndt.mqnavigator.controller;

import com.unitekndt.mqnavigator.dto.*;
import com.unitekndt.mqnavigator.entity.ChannelChat;
import com.unitekndt.mqnavigator.entity.User;
import com.unitekndt.mqnavigator.entity.Workspace;
import com.unitekndt.mqnavigator.service.ChannelChatService;
import com.unitekndt.mqnavigator.service.ChannelService;
import com.unitekndt.mqnavigator.service.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/workspaces")
public class WorkspaceController {

    @Autowired
    private WorkspaceService workspaceService;
    @Autowired
    private ChannelService channelService;
    @Autowired
    private ChannelChatService channelChatService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;  // Spring WebSocket을 사용한 메시지 전송

    // 현재 로그인한 사용자가 속한 워크스페이스 목록을 조회
    @GetMapping
    public ResponseEntity<List<IWorkspace>> getWorkspacesForUser(@AuthenticationPrincipal User currentUser) {
        // 서비스 계층에서 DTO로 변환된 데이터를 바로 받아옴
        List<IWorkspace> workspaces = workspaceService.getWorkspacesByUserDto(currentUser.getId());
        return ResponseEntity.ok(workspaces);
    }

    // 워크스페이스 생성
    @PostMapping
    @Transactional
    public ResponseEntity<IWorkspace> createWorkspace(
            @RequestBody WorkspaceCreationRequest request,
            @AuthenticationPrincipal User currentUser) {

        // 서비스 계층에서 워크스페이스를 생성하고, DTO로 변환하여 반환
        IWorkspace createdWorkspace = workspaceService.createWorkspaceDto(request, currentUser);
        return ResponseEntity.ok(createdWorkspace);
    }

    // 현재 로그인한 사용자가 속한 워크스페이스의 채널 목록 조회
    @GetMapping("/{workspaceUrl}/channels")
    public ResponseEntity<List<IChannel>> getUserChannels(
            @PathVariable String workspaceUrl,
            @AuthenticationPrincipal User currentUser) {

        // 서비스 계층에서 DTO로 변환된 채널 리스트를 받아옴
        List<IChannel> userChannels = workspaceService.getUserChannelsDto(workspaceUrl, currentUser.getId());
        return ResponseEntity.ok(userChannels);
    }

    // 워크스페이스 내부에 채널을 생성하는 메서드
    @PostMapping("/{workspaceUrl}/channels")
    @Transactional
    public ResponseEntity<IChannel> createChannel(
            @PathVariable String workspaceUrl,
            @RequestBody ChannelCreationRequest request,  // 요청에서 채널 이름을 받음
            @AuthenticationPrincipal User currentUser) {  // 현재 로그인된 사용자 정보 주입

        // 서비스 계층에서 워크스페이스 URL과 사용자 ID로 채널을 생성
        IChannel createdChannel = channelService.createChannelInWorkspace(workspaceUrl, request.getName(), currentUser);

        return ResponseEntity.ok(createdChannel);
    }

    // 워크스페이스 내에서 특정 채널 정보를 가져오는 메서드
    @GetMapping("/{workspaceUrl}/channels/{channelName}")
    public ResponseEntity<IChannel> getChannelInfo(
            @PathVariable String workspaceUrl,         // URL에서 워크스페이스 정보 추출
            @PathVariable String channelName           // URL에서 채널 정보 추출
    ) {
        // 서비스 계층에서 해당 채널 정보 가져오기
        IChannel channelDto = channelService.getChannelInWorkspace(workspaceUrl, channelName);

        return ResponseEntity.ok(channelDto);
    }

    // 특정 워크스페이스의 특정 채널에 속한 채팅 목록을 가져오는 메서드
    @GetMapping("/{workspaceUrl}/channels/{channelName}/chats")
    public ResponseEntity<List<IChat>> getChannelChats(
            @PathVariable String workspaceUrl,      // 워크스페이스 URL
            @PathVariable String channelName,       // 채널 이름
            @RequestParam int perPage,              // 한 페이지당 메시지 개수
            @RequestParam int page                  // 페이지 번호
    ) {
        // 서비스 계층에서 채팅 데이터를 가져와 DTO로 변환
        List<IChat> chats = channelService.getChatsInChannel(workspaceUrl, channelName, perPage, page);

        return ResponseEntity.ok(chats);  // DTO 변환된 채팅 목록을 반환
    }

    // 특정 워크스페이스와 채널에서 안 읽은 채팅 메시지 수를 가져오는 메서드
    @GetMapping("/{workspaceUrl}/channels/{channelName}/unreads")
    public ResponseEntity<Long> getUnreadCount(
            @PathVariable String workspaceUrl,       // 워크스페이스 URL
            @PathVariable String channelName,        // 채널 이름
            @RequestParam("after") Long after        // after 파라미터 (Timestamp)
    ) {
        // 서비스 계층에서 안 읽은 채팅 메시지 개수 조회
        Long unreadCount = channelService.getUnreadCount(workspaceUrl, channelName, after);

        return ResponseEntity.ok(unreadCount);
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