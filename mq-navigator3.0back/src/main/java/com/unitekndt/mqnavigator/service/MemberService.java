package com.unitekndt.mqnavigator.service;

import com.unitekndt.mqnavigator.dto.IWorkspace;
import com.unitekndt.mqnavigator.dto.MemberDTO;
import com.unitekndt.mqnavigator.dto.UserRegistrationRequest;
import com.unitekndt.mqnavigator.entity.Member;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
public interface MemberService {

  MemberDTO registerMember(UserRegistrationRequest request);

  List<IWorkspace> getWorkspacesByEmail(String email);

  Optional<Member> getMemberById(Long id);

//  Optional<Member> getMemberByEmail(String email);
Member getMemberByEmail(String email);

  default MemberDTO entityToDTO(Member member) {
      return new MemberDTO(
            member.getId(),
      member.getEmail(),
      member.getName(),
      member.getNickname(),
      member.getPassword(),
      member.getMemberRoleList().stream().map(Enum::name).collect(Collectors.toList()));
  }

}
