package com.unitekndt.mqnavigator.dto;

import com.unitekndt.mqnavigator.entity.Coordinate;

import java.time.LocalDateTime;

public class IGate {
    private Long id;
    private Integer index;
    private LocalDateTime time;  // Date 대신 LocalDateTime 사용
    private Coordinate coordinate;  // ICoordinate 객체를 CoordinateDto로 변환
    private Double traveledDistance;
}
