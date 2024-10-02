package com.unitekndt.mqnavigator.controller;

import com.unitekndt.mqnavigator.entity.Channel;
import com.unitekndt.mqnavigator.service.ChannelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/channels")
public class ChannelController {

    private final ChannelService channelService;

    public ChannelController(ChannelService channelService) {
        this.channelService = channelService;
    }

    // 모든 채널 조회
    @GetMapping
    public ResponseEntity<List<Channel>> getAllChannels() {
        List<Channel> channels = channelService.getAllChannels();
        return ResponseEntity.ok(channels);
    }

    // 채널 ID로 조회
    @GetMapping("/{channelId}")
    public ResponseEntity<Channel> getChannelById(@PathVariable Long channelId) {
        Optional<Channel> channel = channelService.getChannelById(channelId);
        return channel.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 채널 이름으로 조회
    @GetMapping("/search")
    public ResponseEntity<List<Channel>> getChannelsByName(@RequestParam String name) {
        List<Channel> channels = channelService.getChannelsByName(name);
        return ResponseEntity.ok(channels);
    }

    // 새로운 채널 생성
    @PostMapping
    public ResponseEntity<Channel> createChannel(@RequestBody Channel channel) {
        Channel createdChannel = channelService.createChannel(channel);
        return ResponseEntity.ok(createdChannel);
    }

    // 채널 삭제
    @DeleteMapping("/{channelId}")
    public ResponseEntity<Void> deleteChannel(@PathVariable Long channelId) {
        channelService.deleteChannel(channelId);
        return ResponseEntity.noContent().build();
    }
}
