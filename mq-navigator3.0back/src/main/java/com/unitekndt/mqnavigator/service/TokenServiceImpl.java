package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.entity.Member;
import com.unitekndt.mqnavigator.repository.MemberRepository;
import com.unitekndt.mqnavigator.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {
    private final MemberRepository memberRepository;

    public Member getUserFromToken(String token) {
        // 토큰을 검증하고 클레임을 추출
        Map<String, Object> claims = JWTUtil.validateToken(token);

        // 클레임에서 사용자 이메일을 추출 (예: 클레임에 "email"이라는 필드가 있다고 가정)
        String email = (String) claims.get("email");

        // 이메일로 사용자 정보 조회
        return memberRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
