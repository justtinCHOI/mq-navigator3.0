package com.unitekndt.mqnavigator.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "channels")
public class Channel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private boolean isPrivate;

    @ManyToOne
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;

    // Getters and setters
}