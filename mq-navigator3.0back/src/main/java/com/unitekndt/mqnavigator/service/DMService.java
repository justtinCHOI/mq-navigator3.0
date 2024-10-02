package com.unitekndt.mqnavigator.service;


import com.unitekndt.mqnavigator.entity.DM;
import com.unitekndt.mqnavigator.repository.DMRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DMService {

    @Autowired
    private DMRepository dmRepository;

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