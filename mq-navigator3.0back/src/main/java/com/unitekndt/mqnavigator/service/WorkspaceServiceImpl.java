package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.dto.IRoute;
import com.unitekndt.mqnavigator.dto.IWorkspace;
import com.unitekndt.mqnavigator.entity.Gate;
import com.unitekndt.mqnavigator.entity.Member;
import com.unitekndt.mqnavigator.entity.Route;
import com.unitekndt.mqnavigator.entity.Workspace;
import com.unitekndt.mqnavigator.repository.RouteRepository;
import com.unitekndt.mqnavigator.repository.WorkspaceRepository;
import com.unitekndt.mqnavigator.util.WorkspaceUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class WorkspaceServiceImpl implements WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final RouteRepository routeRepository;
    private final WorkspaceUtil workspaceUtil;

    @Override
    public IWorkspace getWorkspaceByUrlAndMember(String workspaceUrl, Member member) {
        Optional<Workspace> workspaceOpt = workspaceRepository.findByUrlAndMembersContains(workspaceUrl, member);
        return workspaceOpt.map(this::entityToDto).orElse(null);
    }

    @Override
    public IWorkspace updateWorkspace(IWorkspace workspaceDto, Member member) {
        Workspace workspace = dtoToEntity(workspaceDto);
        workspace.setOwner(member);
        workspaceRepository.save(workspace);
        return entityToDto(workspace);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public IWorkspace createWorkspace(Member member, String name, String url) {

        if (workspaceRepository.existsByName(name)) {
            log.info("workspaceRepository.existsByName(name) : {} {} ", name, workspaceRepository.existsByName(name));
            throw new IllegalArgumentException("Workspace name already exists.");
        } else if (workspaceRepository.existsByUrl(url)) {
            log.info("workspaceRepository.existsByUrl(url) : {} {} ", url, workspaceRepository.existsByUrl(url));
            throw new IllegalArgumentException("Workspace URL already exists.");
        } else {
            // 새로운 워크스페이스 생성
            Workspace workspace = workspaceUtil.createDefaultWorkspace(member, name, url);

            // 기본 라우트 생성
            Route route = workspaceUtil.createDefaultRoute(member, workspace);
            workspace.setRoute(route);
            workspace.getRoutes().add(route);

            // 기본 게이트 리스트 생성 및 추가
            List<Gate> gates = workspaceUtil.createDefaultGates(workspace, route.getCoordinates());
            workspace.setGates(gates);

            // 워크스페이스에 멤버 추가
            workspace.getMembers().add(member);

            // 워크스페이스를 회원 소유 워크스페이스 리스트에 추가
            member.getOwnedWorkspaces().add(workspace);
            member.getWorkspaces().add(workspace);

            // 워크스페이스 저장
            workspaceRepository.save(workspace);

            log.info("new workspace : {}", workspace);

            return entityToDto(workspace);
        }
    }

    @Override
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

    @Override
    public IWorkspace entityToDto(Workspace workspace) {
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
