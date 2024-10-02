package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.entity.Mention;
import com.unitekndt.mqnavigator.repository.MentionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MentionService {

    private final MentionRepository mentionRepository;

    @Autowired
    public MentionService(MentionRepository mentionRepository) {
        this.mentionRepository = mentionRepository;
    }

    public List<Mention> getAllMentions() {
        return mentionRepository.findAll();
    }

    public Mention getMentionById(Long id) {
        return mentionRepository.findById(id).orElse(null);
    }

    public Mention createMention(Mention mention) {
        return mentionRepository.save(mention);
    }

    public void deleteMention(Long id) {
        mentionRepository.deleteById(id);
    }
}