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

import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        log.info("loadUserByUsername email: {} ", email);

        Member member = memberRepository.getWithRoles(email); // Unique key 을 통해서 Member 정보를 꺼낸다.

        if(member == null){
            throw new UsernameNotFoundException("Not Found");
        }

        return new MemberDTO(
                member.getId(),
                member.getEmail(),
                member.getName(),
                member.getNickname(),
                member.getPassword(),
                member.getMemberRoleList()
                        .stream()
                        .map(Enum::name).collect(Collectors.toList()));

    }

}
