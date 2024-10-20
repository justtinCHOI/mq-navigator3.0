package com.unitekndt.mqnavigator.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class IWorkspace {
    private Long id;
    private String name;
    private String url;
    private Long ownerId;
    private List<Long> members;  // members 의 member 중 id만 반환.
    private List<IRoute> routes;
    private IRoute route;
}
