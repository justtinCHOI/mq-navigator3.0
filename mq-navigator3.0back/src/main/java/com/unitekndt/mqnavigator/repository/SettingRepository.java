package com.unitekndt.mqnavigator.repository;

import com.unitekndt.mqnavigator.entity.Setting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingRepository extends JpaRepository<Setting, Long> {
    // Setting 관련 추가 조회 로직이 필요하면 여기에 작성할 수 있음
}