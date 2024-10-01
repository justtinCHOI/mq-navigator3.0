package com.unitekndt.mqnavigator.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "dms")
public class DM {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // Getters and setters
}
