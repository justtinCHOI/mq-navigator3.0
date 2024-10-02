package com.unitekndt.mqnavigator.controller;

import com.unitekndt.mqnavigator.entity.DM;
import com.unitekndt.mqnavigator.service.DMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dms")
public class DMController {

    @Autowired
    private DMService dmService;

    @GetMapping
    public ResponseEntity<List<DM>> getAllDMs() {
        return ResponseEntity.ok(dmService.getAllDMs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DM> getDMById(@PathVariable Long id) {
        Optional<DM> dm = dmService.getDMById(id);
        return dm.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DM> createDM(@RequestBody DM dm) {
        DM createdDM = dmService.createDM(dm);
        return ResponseEntity.ok(createdDM);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDM(@PathVariable Long id) {
        dmService.deleteDM(id);
        return ResponseEntity.noContent().build();
    }
}
