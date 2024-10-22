package com.unitekndt.mqnavigator.repository;

import com.unitekndt.mqnavigator.entity.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {//email 이 pk 이므로 String

    //email 을 이용하여 MemberRole 을 포함한 Member 가져오기
  //ElementCollection 을 포함하여 구하고 싶을 떄는 EntityGraph 를 사용한다.
  @EntityGraph(attributePaths = {"memberRoleList"})
  @Query("select m from Member m where m.email = :email")
  Optional<Member> getWithRoles(@Param("email") String email);

    Optional<Member> findByEmail(String email);
//    Member findByEmail(String email);

    Optional<Member> findById(Long id);

}
