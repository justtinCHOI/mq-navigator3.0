package com.unitekndt.mqnavigator.controller;

import com.unitekndt.mqnavigator.dto.IWorkspace;
import com.unitekndt.mqnavigator.dto.MemberDTO;
import com.unitekndt.mqnavigator.dto.UserRegistrationRequest;
import com.unitekndt.mqnavigator.entity.Member;
import com.unitekndt.mqnavigator.service.MemberService;
import com.unitekndt.mqnavigator.service.TokenService;
import com.unitekndt.mqnavigator.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;
@Log4j2
@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

  private final MemberService memberService;
  private final TokenService tokenService;

  // 사용자 회원가입
  @PostMapping("/singup")
  public Map<String, Object> singUp(@RequestBody UserRegistrationRequest request) {
    MemberDTO memberDTO = memberService.registerMember(request);

    Map<String, Object> claims = memberDTO.getClaims();

    String jwtAccessToken = JWTUtil.generateToken(claims, 10);
    String jwtRefreshToken = JWTUtil.generateToken(claims,60*24);

    claims.put("accessToken", jwtAccessToken);
    claims.put("refreshToken", jwtRefreshToken);

    return claims;
  }

  @GetMapping("/workspaces")
  public List<IWorkspace> getWorkspaces(@RequestHeader("Authorization") String authHeader) {
    // "Bearer "를 제거한 JWT 토큰을 추출
    String token = authHeader.substring(7);

    // 토큰에서 사용자 정보를 추출
    Member member = tokenService.getUserFromToken(token);

    // 사용자 이메일을 기반으로 작업 공간 조회
    return memberService.getWorkspacesByEmail(member.getEmail());
  }

  @PostMapping("/logout")
  public ResponseEntity<String> logout(@RequestHeader("Authorization") String authHeader) {
    String token = authHeader.substring(7); // 토큰에서 Bearer 제거
    Member member = tokenService.getUserFromToken(token); // 토큰에서 사용자 정보 추출

    return memberService.logout(member); // 로그아웃 서비스 호출
  }
}
