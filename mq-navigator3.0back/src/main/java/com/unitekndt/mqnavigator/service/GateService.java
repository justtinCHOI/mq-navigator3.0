package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.dto.IGate;
import com.unitekndt.mqnavigator.entity.Gate;
import com.unitekndt.mqnavigator.entity.Member;
import com.unitekndt.mqnavigator.repository.GateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GateService {

    @Autowired
    private GateRepository gateRepository;

    @Autowired
    private TokenService tokenService;

    public List<IGate> getGatesByWorkspaceUrl(String token, String workspaceUrl) {
        // 토큰에서 사용자 정보 추출
        Member member = tokenService.getUserFromToken(token);

        // 해당 workspace의 gates 조회 및 변환
        return gateRepository.findByWorkspaceUrl(workspaceUrl).stream().map(this::toIGateDto).collect(Collectors.toList());
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
}