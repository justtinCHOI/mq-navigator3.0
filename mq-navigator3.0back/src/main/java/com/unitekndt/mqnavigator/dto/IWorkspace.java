package com.unitekndt.mqnavigator.dto;

import java.util.List;

public class IWorkspace {
    private Long id;
    private String name;
    private String url;
    private Long ownerId;  // ownerId를 Long 타입으로 변경
    private List<Long> members;  // Number 배열을 Java Long 리스트로 변환
    private List<IRoute> routes;  // IRoute 배열을 Java 리스트로 변환
    private IRoute route;  // IRoute 객체를 RouteDto로 변환
}
