package com.unitekndt.mqnavigator.controller;

import com.unitekndt.mqnavigator.entity.Mention;
import com.unitekndt.mqnavigator.service.MentionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentions")
public class MentionController {

    private final MentionService mentionService;

    @Autowired
    public MentionController(MentionService mentionService) {
        this.mentionService = mentionService;
    }

    @GetMapping
    public ResponseEntity<List<Mention>> getAllMentions() {
        return ResponseEntity.ok(mentionService.getAllMentions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mention> getMentionById(@PathVariable Long id) {
        Mention mention = mentionService.getMentionById(id);
        if (mention != null) {
            return ResponseEntity.ok(mention);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Mention> createMention(@RequestBody Mention mention) {
        Mention createdMention = mentionService.createMention(mention);
        return ResponseEntity.ok(createdMention);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMention(@PathVariable Long id) {
        mentionService.deleteMention(id);
        return ResponseEntity.noContent().build();
    }
}