package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.dto.IRoute;
import com.unitekndt.mqnavigator.dto.IWorkspace;
import com.unitekndt.mqnavigator.entity.Member;
import com.unitekndt.mqnavigator.entity.Route;
import com.unitekndt.mqnavigator.entity.Workspace;
import com.unitekndt.mqnavigator.repository.RouteRepository;
import com.unitekndt.mqnavigator.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final RouteRepository routeRepository;

    public IWorkspace getWorkspaceByUrlAndMember(String workspaceUrl, Member member) {
        Optional<Workspace> workspaceOpt = workspaceRepository.findByUrlAndMembersContains(workspaceUrl, member);
        return workspaceOpt.map(this::entityToDto).orElse(null);
    }

    public IWorkspace updateWorkspace(IWorkspace workspaceDto, Member member) {
        Workspace workspace = dtoToEntity(workspaceDto);
        workspace.setOwner(member);
        workspaceRepository.save(workspace);
        return entityToDto(workspace);
    }

    public IWorkspace createWorkspace(IWorkspace newWorkspace, Member member) {
        Workspace workspace = dtoToEntity(newWorkspace);
        workspace.setOwner(member);
        workspaceRepository.save(workspace);
        return entityToDto(workspace);
    }

    public IRoute addRouteToWorkspace(String workspaceUrl, IRoute routeDto, Member member) {
        Workspace workspace = workspaceRepository.findByUrlAndOwner(workspaceUrl, member);
        if (workspace == null) return null;

        Route route = new Route();
        route.setName(routeDto.getName());
        route.setCoordinates(routeDto.getCoordinates());
        route.setWorkspace(workspace);

        routeRepository.save(route);
        return routeDto;
    }

    private IWorkspace entityToDto(Workspace workspace) {
        return IWorkspace.builder()
                .id(workspace.getId())
                .name(workspace.getName())
                .url(workspace.getUrl())
                .ownerId(workspace.getOwner().getId())
                .members(workspace.getMembers().stream().map(Member::getId).collect(Collectors.toList()))
                .routes(workspace.getRoutes().stream().map(this::routeToDto).collect(Collectors.toList()))
                .route(routeToDto(workspace.getRoute()))
                .build();
    }

    private IRoute routeToDto(Route route) {
        return IRoute.builder()
                .id(route.getId())
                .name(route.getName())
                .coordinates(route.getCoordinates())
                .build();
    }

    private Workspace dtoToEntity(IWorkspace dto) {
        return Workspace.builder()
                .name(dto.getName())
                .url(dto.getUrl())
                .build();
    }
}
