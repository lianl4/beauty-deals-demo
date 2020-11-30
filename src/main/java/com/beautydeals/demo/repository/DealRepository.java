package com.beautydeals.demo.repository;

import com.beautydeals.demo.model.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DealRepository extends JpaRepository<Deal, Long> {
    List<Deal> findByIdIn(List<Long> dealIds, Sort sort);
}



