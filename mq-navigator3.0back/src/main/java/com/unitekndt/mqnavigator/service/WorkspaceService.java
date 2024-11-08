package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.dto.IRoute;
import com.unitekndt.mqnavigator.dto.IWorkspace;
import com.unitekndt.mqnavigator.entity.Member;
import com.unitekndt.mqnavigator.entity.Workspace;
import org.springframework.stereotype.Service;


@Service
public interface WorkspaceService {

    IWorkspace getWorkspaceByUrlAndMember(String workspaceUrl, Member member);
    IWorkspace updateWorkspace(IWorkspace workspaceDto, Member member);
    IWorkspace createWorkspace(Member member, String name, String url);
    IRoute addRouteToWorkspace(String workspaceUrl, IRoute routeDto, Member member);

    IWorkspace entityToDto(Workspace workspace);

}
