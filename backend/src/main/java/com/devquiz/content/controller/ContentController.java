package com.devquiz.content.controller;

import com.devquiz.common.response.ApiResponse;
import com.devquiz.content.dto.DailyContentDetailResponse;
import com.devquiz.content.dto.DailyContentResponse;
import com.devquiz.content.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/contents")
@RequiredArgsConstructor
public class ContentController {

    private final ContentService contentService;

    @GetMapping("/today")
    public ApiResponse<DailyContentDetailResponse> getTodayContent() {
        DailyContentDetailResponse content = contentService.getTodayContent();
        return ApiResponse.success(content);
    }

    @GetMapping("/date/{date}")
    public ApiResponse<DailyContentDetailResponse> getContentByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        DailyContentDetailResponse content = contentService.getContentByDate(date);
        return ApiResponse.success(content);
    }

    @GetMapping("/{contentId}")
    public ApiResponse<DailyContentDetailResponse> getContentById(@PathVariable Long contentId) {
        DailyContentDetailResponse content = contentService.getContentById(contentId);
        return ApiResponse.success(content);
    }

    // 이번 주 콘텐츠 목록 조회 (월요일 ~ 오늘)
    @GetMapping("/this-week")
    public ApiResponse<List<DailyContentResponse>> getThisWeekContents() {
        List<DailyContentResponse> contents = contentService.getThisWeekContents();
        return ApiResponse.success(contents);
    }

    // TODO: 페이지네이션 적용
    @GetMapping
    public ApiResponse<List<DailyContentResponse>> getContentsByPeriod(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<DailyContentResponse> contents = contentService.getContentsByPeriod(startDate, endDate);
        return ApiResponse.success(contents);
    }
}
