package com.unitekndt.mqnavigator.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
//@JsonInclude(JsonInclude.Include.NON_NULL)  // null 값은 직렬화하지 않음
public class IWorkspace {
    private Long id;
    private String name;
    private String url;
    private Long ownerId;
    private List<Long> members;  // members 의 member 중 id만 반환.
    private List<IRoute> routes;
    private IRoute route;
}
