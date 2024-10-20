package com.unitekndt.mqnavigator.dto;

import com.unitekndt.mqnavigator.entity.Coordinate;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class IGate {
    private Long id;
    private Long sequence;
    private Coordinate coordinate;
    private LocalDateTime time;
    private Long traveledDistance;
}