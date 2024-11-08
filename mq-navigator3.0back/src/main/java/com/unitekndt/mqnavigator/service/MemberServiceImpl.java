package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.dto.IWorkspace;
import com.unitekndt.mqnavigator.dto.MemberDTO;
import com.unitekndt.mqnavigator.dto.UserRegistrationRequest;
import com.unitekndt.mqnavigator.entity.*;
import com.unitekndt.mqnavigator.repository.MemberRepository;
import com.unitekndt.mqnavigator.repository.WorkspaceRepository;
import com.unitekndt.mqnavigator.util.WorkspaceUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final WorkspaceRepository workspaceRepository;
    private final PasswordEncoder passwordEncoder;
    private final WorkspaceUtil workspaceUtil;
    private final WorkspaceService workspaceService;


    @Override
    public MemberDTO registerMember(UserRegistrationRequest request) {

        Optional<Member> result = memberRepository.findByEmail(request.getEmail());

        // 기존의 회원
        if (result.isPresent()) {
            return entityToDTO(result.get());
        }
        // 새로운 회원 생성
        Member newMember = makeMember(request);

        // 먼저 newMember를 데이터베이스에 저장해서 ID를 생성
        memberRepository.save(newMember);

        Map<String, String> unique =  createUnique();

        // 워크스페이스 생성
        Workspace workspace = workspaceUtil.createDefaultWorkspace(newMember, unique.get("uniqueName"), unique.get("uniqueUrl"));

        // 라우트 생성 및 좌표 설정
        Route route = workspaceUtil.createDefaultRoute(newMember, workspace);
        workspace.getRoutes().add(route);
        workspace.setRoute(route);

        // 게이트 생성 및 설정
        List<Gate> gates = workspaceUtil.createDefaultGates(workspace, route.getCoordinates());
        workspace.setGates(gates);

        // 워크스페이스에 멤버 추가
        workspace.getMembers().add(newMember);

        // 워크스페이스를 회원 소유 워크스페이스 리스트에 추가
        newMember.getOwnedWorkspaces().add(workspace);
        newMember.getWorkspaces().add(workspace);

        // 회원 저장
        memberRepository.save(newMember);

        return entityToDTO(newMember);
    }

    public Map<String, String> createUnique(){
        // 자동으로 고유한 이름을 생성하는 로직
        String baseName = "workspace";
        String baseUrl = "mqnavigator";

        int suffix = 1;
        String uniqueName = baseName + suffix;
        String uniqueUrl = baseUrl + suffix;

        // 중복된 이름 또는 URL이 없을 때까지 suffix를 증가시킴
        while (workspaceRepository.existsByName(uniqueName) || workspaceRepository.existsByUrl(uniqueUrl)) {
            suffix++;
            uniqueName = baseName + suffix;
            uniqueUrl = baseUrl + suffix;
        }

        Map<String, String> unique = new HashMap<>();
        unique.put("uniqueName", uniqueName);
        unique.put("uniqueUrl", uniqueUrl);

        return unique;
    }

    private Member makeMember(UserRegistrationRequest request) {
        Member member =  Member.builder()
                .email(request.getEmail())
                .name("Default Name")
                .nickname(request.getNickname())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        member.addRole(MemberRole.USER);

        return member;
    }


    // 이메일을 통해 워크스페이스 정보 가져오기
    @Override
    public List<IWorkspace> getWorkspacesByEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        log.info("member with email : {} ", member);

        if (member.isPresent()) {
            List<IWorkspace> workspaceDTOs = new ArrayList<>();
            List<Workspace> workspaces = member.get().getWorkspaces();
            log.info("workspaces with member : {} ", workspaces);

            // 해당 회원의 워크스페이스 목록 가져오기
            for (Workspace workspace : workspaces) {
                Route workspaceRoute = workspace.getRoute();
                if (workspaceRoute != null) {
                    IWorkspace workspaceDTO = workspaceService.entityToDto(workspace);
                    workspaceDTOs.add(workspaceDTO);
                }
            }
            log.info("workspaceDTOs with member : {} ", workspaceDTOs);
            return workspaceDTOs;
        } else {
            return new ArrayList<>(); // 회원이 없는 경우 빈 리스트 반환
        }
    }

    @Override
    public ResponseEntity<String> logout(Member member) {
        // 필요한 경우 세션 무효화, 토큰 삭제 등 처리
        return ResponseEntity.ok("로그아웃 성공");
    }


}
