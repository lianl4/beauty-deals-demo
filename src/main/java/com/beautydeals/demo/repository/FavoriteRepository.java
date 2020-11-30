package com.beautydeals.demo.repository;

import com.beautydeals.demo.model.Favorite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    @Query("SELECT v.product.id FROM Favorite v where v.user.id = :userId")
    Page<Long> findFavoriteProductIdsByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT v.deal.id FROM Favorite v where v.user.id = :userId")
    Page<Long> findFavoriteDealIdsByUserId(@Param("userId") Long userId, Pageable pageable);
}
