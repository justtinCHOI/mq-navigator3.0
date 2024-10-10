package com.unitekndt.mqnavigator.entity;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import jakarta.persistence.EntityListeners;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Copyright extends Auditable {

    @Column(nullable = false)
    private Boolean isPublic;

    @Column(nullable = false)
    private Long usage;

    @Column(nullable = false)
    private String copyrightHolder;
}