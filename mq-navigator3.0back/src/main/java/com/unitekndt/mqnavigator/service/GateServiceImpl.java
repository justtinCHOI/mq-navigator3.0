package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.dto.IGate;
import com.unitekndt.mqnavigator.entity.Gate;
import com.unitekndt.mqnavigator.entity.Member;
import com.unitekndt.mqnavigator.entity.Workspace;
import com.unitekndt.mqnavigator.repository.GateRepository;
import com.unitekndt.mqnavigator.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GateServiceImpl implements GateService {

    private final GateRepository gateRepository;
    private final TokenService tokenService;
    private final WorkspaceRepository workspaceRepository;

    public List<IGate> getGatesByWorkspaceUrl(String token, String workspaceUrl) {
        // 토큰에서 사용자 정보 추출
        Member member = tokenService.getUserFromToken(token);

        // 해당 workspace의 gates 조회 및 변환
        return gateRepository.findByWorkspaceUrl(workspaceUrl).stream().map(this::toIGateDto).collect(Collectors.toList());
    }

    @Transactional
    public List<IGate> updateGatesByWorkspaceUrl(String token, String workspaceUrl, List<IGate> gates) {
        Workspace workspace = workspaceRepository.findByUrl(workspaceUrl);
        if (workspace == null) {
            throw new RuntimeException("Workspace not found with URL: " + workspaceUrl);
        }

        List<Gate> updatedGates = gates.stream()
                .map(this::toGateEntity)
                .collect(Collectors.toList());

        // 자식 엔티티를 수정할 떄 부모 엔티티의 자식 필드를 지우고 생성해야한다.
        workspace.getGates().clear();

        // 새 게이트 엔티티 설정 및 추가
        updatedGates.forEach(gate -> {
            gate.setWorkspace(workspace);  // 워크스페이스 설정
            workspace.getGates().add(gate);  // 워크스페이스 게이트 컬렉션에 추가
        });

        // 게이트 리스트 저장 (새로운 엔티티는 생성되고, 기존 엔티티는 업데이트)
        gateRepository.saveAll(updatedGates);

        workspaceRepository.save(workspace);  // 워크스페이스 업데이트

        return updatedGates.stream().map(this::toIGateDto).collect(Collectors.toList());
    }

    private IGate toIGateDto(Gate gate) {
        return IGate.builder()
                .id(gate.getId())
                .sequence(gate.getSequence())
                .coordinate(gate.getCoordinate())
                .time(gate.getTime())
                .traveledDistance(gate.getTraveledDistance())
                .build();
    }

    private Gate toGateEntity(IGate iGate) {
        return Gate.builder()
                .id(iGate.getId())
                .sequence(iGate.getSequence())
                .coordinate(iGate.getCoordinate())
                .time(iGate.getTime())
                .traveledDistance(iGate.getTraveledDistance())
                .build();
    }
}
