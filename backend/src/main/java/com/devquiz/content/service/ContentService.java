package com.devquiz.content.service;

import com.devquiz.common.exception.BusinessException;
import com.devquiz.content.dto.AIContentResponse;
import com.devquiz.content.dto.ContentCardResponse;
import com.devquiz.content.dto.DailyContentDetailResponse;
import com.devquiz.content.dto.DailyContentResponse;
import com.devquiz.content.entity.*;
import com.devquiz.content.exception.ContentErrorCode;
import com.devquiz.content.external.ai.ContentPromptBuilder;
import com.devquiz.content.external.ai.GeminiService;
import com.devquiz.content.repository.ContentCardRepository;
import com.devquiz.content.repository.DailyContentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ContentService {

    private final DailyContentRepository dailyContentRepository;
    private final ContentCardRepository contentCardRepository;
    private final CategoryService categoryService;
    private final TopicService topicService;
    private final GeminiService geminiService;
    private final ContentPromptBuilder promptBuilder;

    @Transactional
    public Mono<DailyContent> generateContent(LocalDate date, Long categoryId, Long topicPoolId) {

        log.info("콘텐츠 생성 시작 - 날짜: {}, 카테고리 ID: {}", date, categoryId);

        // 해당 날짜에 이미 콘텐츠가 있는지 확인
        if (dailyContentRepository.existsByDate(date)) {
            return Mono.error(new BusinessException(ContentErrorCode.CONTENT_ALREADY_EXISTS));
        }

        // 카테고리 및 토픽 조회
        Category category = categoryService.getCategoryById(categoryId);
        TopicPool topic = (topicPoolId != null)
                ? topicService.getTopicById(topicPoolId) // 특정 토픽 조회
                : topicService.selectNextTopic(categoryId); // 자동 선택

        // AI 프롬프트 생성
        String prompt = promptBuilder.buildPrompt(category, topic);
        log.debug("생성된 프롬프트:\n{}", prompt);

        // AI API 호출 및 후속 작업 체이닝
        return geminiService.generateContent(prompt)
                .publishOn(Schedulers.boundedElastic())
                .map(aiResponse -> {
                    // DailyContent 생성 및 저장
                    DailyContent saved = createAndSaveContent(date, category, topic, aiResponse);

                    // 토픽 사용 처리
                    topicService.markTopicAsUsed(topic.getId(), date);

                    log.info("콘텐츠 생성 완료 - ID: {}, 토픽: {}", saved.getId(), saved.getTopic());
                    return saved;
                });
    }

    @Transactional(readOnly = true)
    public DailyContentDetailResponse getTodayContent() {
        LocalDate today = LocalDate.now();
        log.info("오늘의 콘텐츠 조회 - 날짜: {}", today);

        return getContentByDate(today);
    }

    @Transactional(readOnly = true)
    public DailyContentDetailResponse getContentByDate(LocalDate date) {
        log.info("날짜별 콘텐츠 조회 - 날짜: {}", date);

        DailyContent content = dailyContentRepository.findByDateWithDetails(date)
                .orElseThrow(() -> new BusinessException(ContentErrorCode.CONTENT_NOT_FOUND));

        if (!content.isPublished()) {
            throw new BusinessException(ContentErrorCode.CONTENT_NOT_PUBLISHED);
        }

        List<ContentCardResponse> cardResponses = content.getCards().stream()
                .map(ContentCardResponse::from)
                .collect(toList());

        return DailyContentDetailResponse.of(content, cardResponses);
    }

    @Transactional(readOnly = true)
    public DailyContentDetailResponse getContentById(Long contentId) {
        log.info("콘텐츠 조회 - ID: {}", contentId);

        DailyContent content = dailyContentRepository.findById(contentId)
                .orElseThrow(() -> new BusinessException(ContentErrorCode.CONTENT_NOT_FOUND));

        if (!content.isPublished()) {
            throw new BusinessException(ContentErrorCode.CONTENT_NOT_PUBLISHED);
        }

        List<ContentCard> cards = contentCardRepository.findByDailyContentId(contentId);
        List<ContentCardResponse> cardResponses = cards.stream()
                .map(ContentCardResponse::from)
                .collect(toList());

        return DailyContentDetailResponse.of(content, cardResponses);
    }

    // 기간별 콘텐츠 목록 조회
    @Transactional(readOnly = true)
    public List<DailyContentResponse> getContentsByPeriod(LocalDate startDate, LocalDate endDate) {
        log.info("기간별 콘텐츠 조회 - 시작: {}, 종료: {}", startDate, endDate);

        List<DailyContent> contents = dailyContentRepository.findByPeriod(startDate, endDate);
        return contents.stream()
                .map(DailyContentResponse::from)
                .collect(toList());
    }

    // 최근 콘텐츠 목록 조회 (사용할지 모르겠음)
    @Transactional(readOnly = true)
    public List<DailyContentResponse> getRecentContents() {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(6);

        log.info("최근 7일 콘텐츠 조회");

        return getContentsByPeriod(startDate, endDate);
    }

    // 이번 주 콘텐츠 목록 조회
    @Transactional(readOnly = true)
    public List<DailyContentResponse> getThisWeekContents() {
        LocalDate today = LocalDate.now();

        // 이번 주의 월요일 계산
        LocalDate startDate = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));

        log.info("이번 주 콘텐츠 조회: {} ~ {}", startDate, today);

        List<DailyContent> contents = dailyContentRepository.findWeekdayContents(startDate, today);
        return contents.stream()
                .map(DailyContentResponse::from)
                .collect(toList());
    }

    private DailyContent createAndSaveContent(LocalDate date, Category category, TopicPool topic, AIContentResponse aiResponse) {
        DailyContent dailyContent = DailyContent.builder()
                .date(date)
                .category(category)
                .topicPool(topic)
                .topic(aiResponse.topic())
                .difficulty(Difficulty.valueOf(aiResponse.difficulty()))
                .build();

        // ContentCard 생성 및 연결
        aiResponse.cards().forEach(cardData -> {
            ContentCard card = ContentCard.builder()
                    .dailyContent(dailyContent)
                    .title(cardData.title())
                    .content(cardData.content())
                    .cardOrder(cardData.order())
                    .cardType(CardType.valueOf(cardData.type()))
                    .build();
            dailyContent.addCard(card);
        });

        return dailyContentRepository.save(dailyContent);
    }
}