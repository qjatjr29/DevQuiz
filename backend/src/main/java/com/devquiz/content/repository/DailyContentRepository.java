package com.devquiz.content.repository;

import com.devquiz.content.entity.DailyContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DailyContentRepository extends JpaRepository<DailyContent, Long> {

    Optional<DailyContent> findByDate(LocalDate date);

    @Query("SELECT DISTINCT dc FROM DailyContent dc " +
            "LEFT JOIN FETCH dc.category " +
            "LEFT JOIN FETCH dc.topicPool " +
            "LEFT JOIN FETCH dc.cards " +
            "WHERE dc.date = :date")
    Optional<DailyContent> findByDateWithDetails(@Param("date") LocalDate date);

    @Query("SELECT dc FROM DailyContent dc " +
            "WHERE dc.date BETWEEN :startDate AND :endDate " +
            "ORDER BY dc.date DESC")
    List<DailyContent> findByPeriod(@Param("startDate") LocalDate startDate,
                                    @Param("endDate") LocalDate endDate);

    @Query("SELECT dc FROM DailyContent dc " +
            "WHERE dc.date BETWEEN :startDate AND :endDate " +
            "AND dc.isReview = false")
    List<DailyContent> findWeekdayContents(@Param("startDate") LocalDate startDate,
                                           @Param("endDate") LocalDate endDate);

    boolean existsByDate(LocalDate date);
}
