package com.unitekndt.mqnavigator.repository;

import com.unitekndt.mqnavigator.entities.DM;
import com.unitekndt.mqnavigator.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DMRepository extends JpaRepository<DM, Long> {
    List<DM> findBySenderOrReceiver(User sender, User receiver);
}
