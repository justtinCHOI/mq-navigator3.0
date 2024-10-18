package com.unitekndt.mqnavigator.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

    @Entity
    @Setter
    @Getter
    @Table(name = "routes")
    public class Route extends Copyright{

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(length = 30, nullable = false)
        private String name;

        @ElementCollection
        @CollectionTable(name = "route_coordinates", joinColumns = @JoinColumn(name = "route_id"))
        private List<Coordinate> coordinates = new ArrayList<>();

        @ManyToOne
        @JoinColumn(name = "workspace_id", nullable = false)
        private Workspace workspace;

    }