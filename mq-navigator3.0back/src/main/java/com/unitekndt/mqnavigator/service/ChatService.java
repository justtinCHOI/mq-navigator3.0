package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.dto.IChannel;
import com.unitekndt.mqnavigator.dto.IChat;
import com.unitekndt.mqnavigator.dto.IUser;
import com.unitekndt.mqnavigator.entity.ChannelChat;
import com.unitekndt.mqnavigator.repository.ChannelChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.ArrayList;

@Service
public class ChatService {

    @Autowired
    private ChannelChatRepository channelChatRepository;


























    public IChat entityToDto(ChannelChat chat) {
        IChannel channelDto = new IChannel(
                chat.getChannel().getId(),
                chat.getChannel().getName(),
                chat.getChannel().getIsPrivate(),
                chat.getChannel().getWorkspace().getId()
        );

        IUser userDto = new IUser(
                chat.getUser().getId(),
                chat.getUser().getNickname(),
                chat.getUser().getEmail(),
                new ArrayList<>()
        );

        return new IChat(
                chat.getId(),
                chat.getUser().getId(),
                userDto,
                chat.getContent(),
                chat.getCreatedAt(),
//                // LocalDateTime을 Date로 변환
//                Date createdAtDate = Date.from(chat.getCreatedAt().atZone(ZoneId.systemDefault()).toInstant());
                chat.getChannel().getId(),
                channelDto
        );
    }
}
