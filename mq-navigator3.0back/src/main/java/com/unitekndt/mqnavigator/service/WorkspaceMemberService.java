package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.entity.WorkspaceMember;
import com.unitekndt.mqnavigator.repository.WorkspaceMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkspaceMemberService {

    @Autowired
    private WorkspaceMemberRepository workspaceMemberRepository;

    public List<WorkspaceMember> getAllMembersByWorkspaceId(Long workspaceId) {
        return workspaceMemberRepository.findAll();
    }

    public WorkspaceMember addMember(WorkspaceMember workspaceMember) {
        return workspaceMemberRepository.save(workspaceMember);
    }

    public void removeMember(Long id) {
        workspaceMemberRepository.deleteById(id);
    }
}