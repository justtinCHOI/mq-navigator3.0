package com.unitekndt.mqnavigator.dto;

import com.unitekndt.mqnavigator.entity.Coordinate;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IRoute {
    private Long id;
    private String name;
    private List<Coordinate> coordinates;
    // 필요한 다른 필드 추가
}