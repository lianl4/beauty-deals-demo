package com.beautydeals.demo.repository;

import com.beautydeals.demo.model.DealApprovalCount;
import com.beautydeals.demo.model.Approval;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApprovalRepository extends JpaRepository<Approval, Long> {
    @Query("SELECT NEW com.beautydeals.demo.model.DealApprovalCount(v.deal.id, count(v.id)) FROM Approval v WHERE v.product.id in :productIds GROUP BY v.deal.id")
    List<DealApprovalCount> countByProductIdInGroupByDealId(@Param("productIds") List<Long> productIds);

    @Query("SELECT NEW com.beautydeals.demo.model.DealApprovalCount(v.deal.id, count(v.id)) FROM Approval v WHERE v.product.id = :productId GROUP BY v.deal.id")
    List<DealApprovalCount> countByProductIdGroupByDealId(@Param("productId") Long productId);

    @Query("SELECT NEW com.beautydeals.demo.model.DealApprovalCount(v.deal.id, count(v.id)) FROM Approval v WHERE v.product.productDescription = :productDescription GROUP BY v.deal.id")
    List<DealApprovalCount> countByProductDescriptionGroupByDealId(@Param("productDescription") String productDescription);

    @Query("SELECT v FROM Approval v where v.user.id = :userId and v.product.id in :productIds")
    List<Approval> findByUserIdAndProductIdIn(@Param("userId") Long userId, @Param("productIds") List<Long> productIds);

    @Query("SELECT v FROM Approval v where v.user.id = :userId and v.product.id = :productId")
    Approval findByUserIdAndProductId(@Param("userId") Long userId, @Param("productId") Long productId);

    @Query("SELECT COUNT(v.id) from Approval v where v.user.id = :userId")
    long countByUserId(@Param("userId") Long userId);

    @Query("SELECT v.product.id FROM Approval v WHERE v.user.id = :userId")
    Page<Long> findApprovaldProductIdsByUserId(@Param("userId") Long userId, Pageable pageable);
}

