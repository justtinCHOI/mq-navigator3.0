package com.unitekndt.mqnavigator.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
public class MemberDTO extends User { // security 가 쓰는 dto 타입을 사용해야한다. 생성자 필요

  private Long id;

  private String email;

  private String name;

  private String nickname;

  private String password;

  private List<String> roleNames = new ArrayList<>();

  public MemberDTO(Long id, String email, String name, String nickname, String password, List<String> roleNames) {
    super(email, password,
            roleNames.stream().map(str -> new SimpleGrantedAuthority("ROLE_"+str)).collect(Collectors.toList()));
    // MemberDTO 필드 초기화
    this.id = id;
    this.email = email;
    this.name = name;
    this.nickname = nickname;
    this.password = password;
    this.roleNames = roleNames;
  }

  public Map<String, Object> getClaims() {

    Map<String, Object> dataMap = new HashMap<>();

    dataMap.put("id", id);
    dataMap.put("email", email);
    dataMap.put("name", name);
    dataMap.put("nickname", nickname);
    dataMap.put("password",password);
    dataMap.put("roleNames", roleNames);

    return dataMap;
  }

}
