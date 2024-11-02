package com.unitekndt.mqnavigator.repository;

import com.unitekndt.mqnavigator.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
}
