package com.devquiz.content.repository;

import com.devquiz.content.entity.ContentCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContentCardRepository extends JpaRepository<ContentCard, Long> {

    List<ContentCard> findByDailyContentId(Long dailyContentId);
}
