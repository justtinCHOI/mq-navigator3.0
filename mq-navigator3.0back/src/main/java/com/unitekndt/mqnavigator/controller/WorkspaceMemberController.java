package com.unitekndt.mqnavigator.controller;

import com.unitekndt.mqnavigator.entity.WorkspaceMember;
import com.unitekndt.mqnavigator.service.WorkspaceMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workspace-members")
public class WorkspaceMemberController {

    @Autowired
    private WorkspaceMemberService workspaceMemberService;

//    @GetMapping("/workspace/{workspaceId}")
//    public ResponseEntity<List<WorkspaceMember>> getMembersByWorkspace(@PathVariable Long workspaceId) {
//        return ResponseEntity.ok(workspaceMemberService.getAllMembersByWorkspaceId(workspaceId));
//    }
//
//    @PostMapping
//    public ResponseEntity<WorkspaceMember> addMember(@RequestBody WorkspaceMember workspaceMember) {
//        return ResponseEntity.ok(workspaceMemberService.addMember(workspaceMember));
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> removeMember(@PathVariable Long id) {
//        workspaceMemberService.removeMember(id);
//        return ResponseEntity.noContent().build();
//    }
}