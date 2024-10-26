package com.unitekndt.mqnavigator.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Embeddable;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)  // NULL 값을 직렬화하지 않음
@Embeddable
public class DisplaySection {
    private Location start;
    private Location end;
}