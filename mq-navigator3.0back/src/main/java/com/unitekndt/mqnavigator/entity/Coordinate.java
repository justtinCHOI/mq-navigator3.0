package com.unitekndt.mqnavigator.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class Coordinate {
    private double latitude;
    private double longitude;
}