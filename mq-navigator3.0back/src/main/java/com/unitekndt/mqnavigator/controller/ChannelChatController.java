package com.unitekndt.mqnavigator.controller;

import com.unitekndt.mqnavigator.entity.Channel;
import com.unitekndt.mqnavigator.entity.ChannelChat;
import com.unitekndt.mqnavigator.service.ChannelChatService;
import com.unitekndt.mqnavigator.service.ChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/chats")
public class ChannelChatController {

    private final ChannelChatService channelChatService;
    private final ChannelService channelService;

    @Autowired
    public ChannelChatController(ChannelChatService channelChatService, ChannelService channelService) {
        this.channelChatService = channelChatService;
        this.channelService = channelService;
    }

    @PostMapping
    public ResponseEntity<ChannelChat> createChat(@RequestBody ChannelChat chat) {
        ChannelChat savedChat = channelChatService.saveChannelChat(chat);
        return ResponseEntity.ok(savedChat);
    }

    @GetMapping("/channel/{channelId}")
    public ResponseEntity<List<ChannelChat>> getChatsByChannel(@PathVariable Long channelId) {
        Optional<Channel> channel = channelService.getChannelById(channelId);
        return channel.map(value -> ResponseEntity.ok(channelChatService.getChannelChatsByChannel(value))).orElseGet(() -> ResponseEntity.notFound().build());
    }
}