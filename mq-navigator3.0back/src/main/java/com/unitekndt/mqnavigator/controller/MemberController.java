package com.unitekndt.mqnavigator.controller;

import com.unitekndt.mqnavigator.dto.IWorkspace;
import com.unitekndt.mqnavigator.dto.MemberDTO;
import com.unitekndt.mqnavigator.dto.UserRegistrationRequest;
import com.unitekndt.mqnavigator.entity.Member;
import com.unitekndt.mqnavigator.service.MemberService;
import com.unitekndt.mqnavigator.service.MemberServiceImpl;
import com.unitekndt.mqnavigator.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;

//naver, google, 추가
@RestController
@Log4j2
@RequiredArgsConstructor
public class MemberController {

  private final MemberService memberService;

  // 사용자 회원가입
  @PostMapping("/api/member/singup")
  public Map<String, Object> singUp(@RequestBody UserRegistrationRequest request) {
    MemberDTO memberDTO = memberService.registerMember(request);

    Map<String, Object> claims = memberDTO.getClaims();

    String jwtAccessToken = JWTUtil.generateToken(claims, 10);
    String jwtRefreshToken = JWTUtil.generateToken(claims,60*24);

    claims.put("accessToken", jwtAccessToken);
    claims.put("refreshToken", jwtRefreshToken);

    return claims;
  }

  @GetMapping("/api/member/workspaces")
  public List<IWorkspace> getWorkspaces(@AuthenticationPrincipal Member member) {
    log.info("getWorkspaces member : " + member.getEmail());
    return memberService.getWorkspacesByEmail(member.getEmail());
  }

}
