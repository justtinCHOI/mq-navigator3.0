package com.unitekndt.mqnavigator.entity;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class DisplaySection {
    private Location start;
    private Location end;
}