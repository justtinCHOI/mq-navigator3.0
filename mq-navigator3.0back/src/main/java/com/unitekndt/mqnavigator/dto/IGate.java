package com.unitekndt.mqnavigator.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.unitekndt.mqnavigator.entity.Coordinate;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor  // 기본 생성자 추가
@Builder
public class IGate {
    private Long id;
    private Long sequence;
    private Coordinate coordinate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime time;
    private Long traveledDistance;

    @JsonCreator
    public IGate(
            @JsonProperty("id") Long id,
            @JsonProperty("sequence") Long sequence,
            @JsonProperty("coordinate") Coordinate coordinate,
            @JsonProperty("time") LocalDateTime time,
            @JsonProperty("traveledDistance") Long traveledDistance
    ) {
        this.id = id;
        this.sequence = sequence;
        this.coordinate = coordinate;
        this.time = time;
        this.traveledDistance = traveledDistance;
    }
}