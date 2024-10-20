package com.unitekndt.mqnavigator.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import jakarta.persistence.EntityListeners;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Copyright extends Auditable {

    @Column(nullable = false)
    private Boolean isPublic = Boolean.TRUE;

    @Column(nullable = false)
    private Long useAmount = 0L;

    @Column(nullable = false)
    private Long copyrightHolderId;

}
