package com.devquiz.content.scheduler;

import com.devquiz.content.dto.DailyContentDetailResponse;
import com.devquiz.content.entity.Category;
import com.devquiz.content.service.CategoryService;
import com.devquiz.content.service.ContentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class ContentScheduler {

    private final ContentService contentService;
    private final CategoryService categoryService;

    // 매주 일요일 자정에 다음 주 평일(월~금) 콘텐츠 생성
    @Scheduled(cron = "0 0 0 * * SUN", zone = "Asia/Seoul")
    public void generateWeeklyContents() {
        log.info("=== 주간 콘텐츠 자동 생성 시작 ===");

        LocalDate nextMonday = LocalDate.now().with(DayOfWeek.MONDAY).plusWeeks(1);

        // 월~금 (5일치) 콘텐츠 생성 목록
        List<Mono<Void>> contents = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            LocalDate targetDate = nextMonday.plusDays(i);
            int dayOfWeek = targetDate.getDayOfWeek().getValue(); // 1(월) ~ 5(금)

            try {
                Category category = categoryService.getCategoryByDayOfWeek(dayOfWeek);

                log.info("콘텐츠 생성 예약 - 날짜: {}, 카테고리: {}", targetDate, category.getDisplayName());

                // 콘텐츠 생성 (병렬 처리)
                Mono<Void> generatedContent = contentService.generateContent(targetDate, category.getId(), null)
                        .doOnSuccess(content ->
                                log.info("콘텐츠 생성 성공 - 날짜: {}, ID: {}", targetDate, content.getId()))
                        .doOnError(error ->
                                log.error("콘텐츠 생성 실패 - 날짜: {}", targetDate, error))
                        .then();

                contents.add(generatedContent);

            } catch (Exception e) {
                log.error("콘텐츠 생성 예약 실패 - 날짜: {}", targetDate, e);
            }
        }

        // 모든 작업을 병렬로 실행 (최대 3개씩 동시 실행)
        Flux.fromIterable(contents)
                .flatMap(content -> content, 3) // 동시에 3개씩 실행
                .subscribeOn(Schedulers.boundedElastic())
                .then()
                .block();

        log.info("=== 주간 콘텐츠 자동 생성 완료 ===");
    }

    // 매일 오전 6시에 오늘 콘텐츠 존재 여부 확인 및 publish 처리
    @Scheduled(cron = "0 0 6 * * MON-FRI", zone = "Asia/Seoul")
    public void checkTodayContent() {
        LocalDate today = LocalDate.now();
        try {
            DailyContentDetailResponse todayContent = contentService.getContentByDate(today);
            contentService.getContentByDate(today);
            // TODO: 여기서 publish 하도록 해줘야함.
            log.info("오늘의 콘텐츠가 정상적으로 존재합니다.");

        } catch (Exception e) {
            log.error("⚠️  경고: 오늘의 콘텐츠가 없습니다!");
            log.error("날짜: {}", today);

            // TODO: 알림 발송 (Slack, 이메일 등)
            // notificationService.sendAlert("오늘의 콘텐츠 누락", today);
        }
    }

    // NOTE: 테스트용 (수동으로 content 생성)
    public void generateContentForDate(LocalDate date) {
        log.info("=== 수동 콘텐츠 생성 - 날짜: {} ===", date);

        try {
            Category category = categoryService.getCategoryByDate(date);

            contentService.generateContent(date, category.getId(), null)
                    .doOnSuccess(content ->
                            log.info("수동 콘텐츠 생성 완료 - ID: {}", content.getId()))
                    .doOnError(error ->
                            log.error("수동 콘텐츠 생성 실패", error))
                    .block();

        } catch (Exception e) {
            log.error("수동 콘텐츠 생성 중 오류 발생", e);
        }
    }
}
