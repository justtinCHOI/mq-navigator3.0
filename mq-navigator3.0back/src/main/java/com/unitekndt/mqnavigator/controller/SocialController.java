//package com.unitekndt.mqnavigator.controller;
//
//import com.unitekndt.mqnavigator.util.JWTUtil;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.web.bind.annotation.*;
//
//
//import java.util.Map;
//
////naver, google, 추가
//@RestController
//@Log4j2
//@RequiredArgsConstructor
//public class SocialController {
//
//  private final MemberService memberService;
//
//  @GetMapping("/api/member/kakao")
//  public Map<String,Object> getMemberFromKakao(String accessToken) {
//
//    MemberDTO memberDTO = memberService.getKakaoMember(accessToken);
//
//    Map<String, Object> claims = memberDTO.getClaims();
//
//    String jwtAccessToken = JWTUtil.generateToken(claims, 10);
//    String jwtRefreshToken = JWTUtil.generateToken(claims,60*24);
//
//    claims.put("accessToken", jwtAccessToken);
//    claims.put("refreshToken", jwtRefreshToken);
//    //spring security 는 JWT 를 gson 으로 변환해서 response 에 넣어준다.
//    return claims;
//  }
//
//  @PostMapping("/api/member/singup")
//  public Map<String,Object> singUp(String accessToken) {
//
//    MemberDTO memberDTO = memberService.getKakaoMember(accessToken);
//
//    Map<String, Object> claims = memberDTO.getClaims();
//
//    String jwtAccessToken = JWTUtil.generateToken(claims, 10);
//    String jwtRefreshToken = JWTUtil.generateToken(claims,60*24);
//
//    claims.put("accessToken", jwtAccessToken);
//    claims.put("refreshToken", jwtRefreshToken);
//    //spring security 는 JWT 를 gson 으로 변환해서 response 에 넣어준다.
//    return claims;
//  }
//
//  @PutMapping("/api/member/modify")
//  public Map<String,String> modify(@RequestBody MemberModifyDTO memberModifyDTO) {
//
//    log.info("member modify: " + memberModifyDTO);
//
//    memberService.modifyMember(memberModifyDTO);
//
//    return Map.of("result","modified");
//
//  }
//
//
//}
