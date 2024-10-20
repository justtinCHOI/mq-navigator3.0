package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.dto.IRoute;
import com.unitekndt.mqnavigator.dto.IWorkspace;
import com.unitekndt.mqnavigator.dto.MemberDTO;
import com.unitekndt.mqnavigator.dto.UserRegistrationRequest;
import com.unitekndt.mqnavigator.entity.*;
import com.unitekndt.mqnavigator.repository.MemberRepository;
import com.unitekndt.mqnavigator.repository.WorkspaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final WorkspaceRepository workspaceRepository;
    private final PasswordEncoder passwordEncoder;  // PasswordEncoder 주입

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

        // 워크스페이스 생성
        Workspace workspace = createWorkspace(newMember);

        // 라우트 생성 및 좌표 설정
        Route route = createRoute(newMember, workspace);

        // 워크스페이스에 라우트 추가
        workspace.getRoutes().add(route);

        // 게이트 생성 및 설정
        List<Gate> gates = createGates(workspace, route.getCoordinates());

        // 워크스페이스에 게이트 추가
        workspace.setGates(gates);

        // 워크스페이스에 라우트 추가
        workspace.getMembers().add(newMember);

        // 워크스페이스를 회원의 ownedWorkspaces와 workspaces에 추가
        newMember.getOwnedWorkspaces().add(workspace);
        newMember.getWorkspaces().add(workspace);

        // 회원 저장
        memberRepository.save(newMember);

        return entityToDTO(newMember);
    }

    private Workspace createWorkspace(Member newMember) {

        Map<String, String> unique =  createUnique();


        return Workspace.builder()
                .name(unique.get("uniqueName"))
                .url(unique.get("uniqueUrl"))
                .owner(newMember)
                .copyrightHolderId(newMember.getId())
                .isPublic(true)
                .useAmount(0L)
                .members(new ArrayList<>()) // members 리스트 초기화
                .routes(new ArrayList<>()) // routes 초기화
                .gates(new ArrayList<>())  // gates 초기화
                .setting(createSetting())
                .build();
    }

    private Map<String, String> createUnique(){
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

    // 기본 Setting 생성
    private Setting createSetting() {
        return Setting.builder()
                .colorSetting(createDefaultColorSetting()) // ColorSetting 기본 값 설정
                .refreshInterval(RefreshInterval.ONE)      // 기본 값 설정
                .toleranceRange(ToleranceRange.FIVE)       // 기본 값 설정
                .speedPredictionInterval(SpeedPredictionInterval.FIRST) // 기본 값 설정
                .displaySections(new ArrayList<>())        // DisplaySection 리스트 초기화
                .sectionDatas(new ArrayList<>())           // SectionData 리스트 초기화
                .build();
    }

    // 기본 ColorSetting 생성 메서드
    private ColorSetting createDefaultColorSetting() {
        ColorSetting colorSetting = new ColorSetting();
        colorSetting.setInitialColor(Color.SKY_BLUE); // 기본 값 설정
        colorSetting.setDecelerationColor(Color.PURPLE);
        colorSetting.setConstantSpeedColor(Color.LIGHT_GREEN);
        colorSetting.setAccelerationColor(Color.YELLOW);
        return colorSetting;
    }

    private Route createRoute(Member newMember, Workspace workspace) {
        return Route.builder()
                .name("Seoul Route")
                .coordinates(createCoordinates())
                .workspace(workspace)
                .copyrightHolderId(newMember.getId()) // 소유자의 ID를 저작권자로 설정
                .isPublic(true)  // true로 설정
                .useAmount(0L)   // 0L로 설정
                .build();
    }

    private List<Coordinate> createCoordinates() {
        List<Coordinate> coordinates = new ArrayList<>();
        coordinates.add(new Coordinate(37.5665, 126.9780)); // 서울 좌표
        coordinates.add(new Coordinate(37.5705, 126.9810));
        coordinates.add(new Coordinate(37.5735, 126.9840));
        // 나머지 좌표들도 추가 가능 (총 10개)
        return coordinates;
    }

    private List<Gate> createGates(Workspace workspace, List<Coordinate> coordinates) {
        List<Gate> gates = new ArrayList<>();
        LocalDateTime time = LocalDateTime.now();

        for (int i = 0; i < coordinates.size(); i++) {
            gates.add(Gate.builder()
                    .sequence((long) i)
                    .coordinate(coordinates.get(i))
                    .time(time.plusMinutes(i * 10L))  // 시간은 10분씩 증가
                    .traveledDistance((long) (i * 100L))  // traveledDistance 예시
                    .workspace(workspace)
                    .build());
        }

        return gates;
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

        if (member.isPresent()) {
            List<IWorkspace> workspaceDTOs = new ArrayList<>();
            // 해당 회원의 워크스페이스 목록 가져오기
            for (Workspace workspace : member.get().getWorkspaces()) {
                // Workspace를 IWorkspace DTO로 변환
                IWorkspace workspaceDTO = IWorkspace.builder()
                        .id(workspace.getId())
                        .name(workspace.getName())
                        .url(workspace.getUrl())
                        .ownerId(workspace.getOwner().getId())
                        .members(workspace.getMembers().stream().map(Member::getId).toList())  // members의 id만 추출
                        .routes(workspace.getRoutes().stream()
                                .map(route -> IRoute.builder()
                                        .id(route.getId())
                                        .name(route.getName())
                                        .coordinates(route.getCoordinates())
                                        .build())
                                .toList())
                        .route(IRoute.builder()
                                .id(workspace.getRoute().getId())
                                .name(workspace.getRoute().getName())
                                .coordinates(workspace.getRoute().getCoordinates())
                                .build())
                        .build();

                workspaceDTOs.add(workspaceDTO);
            }
            return workspaceDTOs;
        } else {
            return new ArrayList<>(); // 회원이 없는 경우 빈 리스트 반환
        }
    }

    @Override
    public Member getMemberById(Long id) {
        // MemberRepository를 통해 id로 회원 조회
        Optional<Member> optionalMember = memberRepository.findById(id);

        // 만약 존재하지 않으면 예외를 발생시키거나 null을 반환
        if (optionalMember.isEmpty()) {
            throw new RuntimeException("Member not found for id: " + id);
        }

        // 존재하면 Member 객체 반환
        return optionalMember.get();
    }

}
