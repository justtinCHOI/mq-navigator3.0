package com.unitekndt.mqnavigator.dto;

import com.unitekndt.mqnavigator.entity.Coordinate;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class IRoute {
    private Long id;
    private String name;
    private List<Coordinate> coordinates;
    // 필요한 다른 필드 추가
}