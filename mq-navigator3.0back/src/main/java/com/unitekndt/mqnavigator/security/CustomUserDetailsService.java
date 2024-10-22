package com.unitekndt.mqnavigator.security;

import com.unitekndt.mqnavigator.dto.MemberDTO;
import com.unitekndt.mqnavigator.entity.Member;
import com.unitekndt.mqnavigator.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<Member> memberOpt = memberRepository.getWithRoles(email);

        // 로그 출력 시 Optional 내부의 값 확인
        memberOpt.ifPresent(member -> log.info("loadUserByUsername member: {}", member));

        // Optional이 비어있는 경우 처리
        Member member = memberOpt.orElseThrow(() -> new UsernameNotFoundException("Not Found"));

        return createMemberDTO(member);
    }

    // 중복 코드 정리를 위한 메서드
    private MemberDTO createMemberDTO(Member member) {
        return new MemberDTO(
                member.getId(),
                member.getEmail(),
                member.getName(),
                member.getNickname(),
                member.getPassword(),
                member.getMemberRoleList()
                        .stream()
                        .map(Enum::name)
                        .collect(Collectors.toList()));
    }
}
