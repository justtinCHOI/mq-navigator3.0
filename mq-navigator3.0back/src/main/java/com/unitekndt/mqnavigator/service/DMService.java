package com.unitekndt.mqnavigator.service;


import com.unitekndt.mqnavigator.dto.IDM;
import com.unitekndt.mqnavigator.dto.IUser;
import com.unitekndt.mqnavigator.entity.DM;
import com.unitekndt.mqnavigator.repository.DMRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DMService {

    @Autowired
    private DMRepository dmRepository;

    public IDM entityToDto(DM dm) {
        IUser senderDto = new IUser(
                dm.getSender().getId(),
                dm.getSender().getNickname(),
                dm.getSender().getEmail(),
                new ArrayList<>()
        );

        IUser receiverDto = new IUser(
                dm.getReceiver().getId(),
                dm.getReceiver().getNickname(),
                dm.getReceiver().getEmail(),
                new ArrayList<>()
        );

        return new IDM(
                dm.getId(),
                dm.getSender().getId(),
                senderDto,
                dm.getReceiver().getId(),
                receiverDto,
                dm.getContent(),
                dm.getCreatedAt()
//                // LocalDateTime을 Date로 변환
//                Date createdAtDate = Date.from(dm.getCreatedAt().atZone(ZoneId.systemDefault()).toInstant());
        );
    }







    public List<DM> getAllDMs() {
        return dmRepository.findAll();
    }

    public Optional<DM> getDMById(Long id) {
        return dmRepository.findById(id);
    }

    public DM createDM(DM dm) {
        return dmRepository.save(dm);
    }

    public void deleteDM(Long id) {
        dmRepository.deleteById(id);
    }
}