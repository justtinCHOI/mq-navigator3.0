package com.unitekndt.mqnavigator.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "workspaces")
public class Workspace extends Copyright{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 30, nullable = false, unique = true)
    private String name;

    @Column(length = 30, nullable = false, unique = true)
    private String url;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private Member owner;

    @ManyToMany
    @JoinTable(
            name = "workspace_members",
            joinColumns = @JoinColumn(name = "workspace_id"),
            inverseJoinColumns = @JoinColumn(name = "member_id")
    )
    private List<Member> members = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "main_route_id")  // 메인 Route를 가리키는 컬럼
    private Route route;

    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Route> routes = new ArrayList<>();

//    @OneToMany(mappedBy = "workspace", cascade = {CascadeType.MERGE, CascadeType.PERSIST}, orphanRemoval = true)
    @OneToMany(mappedBy = "workspace", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Gate> gates = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "setting_id", unique = true)
    private Setting setting;
}
