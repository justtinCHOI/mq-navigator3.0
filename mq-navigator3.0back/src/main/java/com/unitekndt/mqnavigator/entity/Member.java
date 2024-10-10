package com.unitekndt.mqnavigator.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

import static com.unitekndt.mqnavigator.entity.MemberStatus.ACTIVE;

@Builder
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 30, nullable = false)
    private String email;

    @Column(length = 30, nullable = false)
    private String name;

    @Column(length = 255, nullable = false)
    private String nickname;

    @Column(length = 255, nullable = false)
    private String password;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Workspace> ownedWorkspaces = new ArrayList<>();

    @ManyToMany(mappedBy = "members")
    @Builder.Default
    private List<Workspace> workspaces = new ArrayList<>();

    @OneToMany(mappedBy = "members")
    private List<Route> routes = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<MemberRole> memberRoleList = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    @Builder.Default
    private MemberStatus memberStatus = ACTIVE;

    public void addRole(MemberRole memberRole){//권한 생성
        memberRoleList.add(memberRole);
    }

    public void clearRole(){ // 사용자가 가지고 있는 권한들 전부 삭제
        memberRoleList.clear();
    }

    @Override
    public String toString() {
        return "Member{" +
                "memberId=" + id +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                ", password='" + password + '\'' +
                ", memberStatus=" + memberStatus +
                ", createdAt=" + getCreatedAt() +
                ", modifiedAt=" + getModifiedAt() +
                '}';
    }
}
