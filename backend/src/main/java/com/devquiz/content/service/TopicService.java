package com.devquiz.content.service;

import com.devquiz.common.exception.BusinessException;
import com.devquiz.content.entity.TopicPool;
import com.devquiz.content.exception.TopicErrorCode;
import com.devquiz.content.repository.TopicPoolRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TopicService {

    private final TopicPoolRepository topicPoolRepository;

    public TopicPool selectNextTopic(long categoryId) {
        log.info("다음 토픽 선택 - 카테고리 ID: {}", categoryId);

        TopicPool topic = topicPoolRepository.findNextTopicForCategory(categoryId)
                .orElseThrow(() -> new BusinessException(TopicErrorCode.NO_AVAILABLE_TOPIC));

        log.info("선택된 토픽: {} (마지막 사용: {}, 사용 횟수: {})",
                topic.getTopicName(), topic.getLastUsedDate(), topic.getUseCount());

        return topic;
    }

    // 토픽 사용
    @Transactional
    public void markTopicAsUsed(long topicId, LocalDate usedDate) {
        log.info("토픽 사용 처리 - ID: {}, 날짜: {}", topicId, usedDate);

        TopicPool topic = topicPoolRepository.findById(topicId)
                .orElseThrow(() -> new BusinessException(TopicErrorCode.TOPIC_NOT_FOUND));

        topic.markAsUsed(usedDate);
        topicPoolRepository.save(topic);

        log.info("토픽 사용 처리 완료 - 총 사용 횟수: {}", topic.getUseCount());
    }

    public TopicPool getTopicById(Long topicPoolId) {
        return topicPoolRepository.findById(topicPoolId)
                .orElseThrow(() -> new BusinessException(TopicErrorCode.TOPIC_NOT_FOUND));
    }
}
