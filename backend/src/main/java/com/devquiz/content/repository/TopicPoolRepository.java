package com.devquiz.content.repository;

import com.devquiz.content.entity.TopicPool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TopicPoolRepository extends JpaRepository<TopicPool, Long> {

    // 카테고리별 다음 토픽 선택 (가장 오래 사용하지 않은 토픽)
    @Query(value = "SELECT * FROM topic_pool t " +
            "WHERE t.category_id = :categoryId " +
            "ORDER BY t.last_used_date ASC NULLS FIRST, t.use_count ASC " +
            "LIMIT 1",
            nativeQuery = true)
    Optional<TopicPool> findNextTopicForCategory(@Param("categoryId") Long categoryId);
}
