package com.devquiz.content.service;

import com.devquiz.common.exception.BusinessException;
import com.devquiz.content.dto.CategoryResponse;
import com.devquiz.content.entity.Category;
import com.devquiz.content.exception.CategoryErrorCode;
import com.devquiz.content.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryResponse> getAllCategories() {
        log.info("모든 카테고리 조회");

        List<Category> categories = categoryRepository.findAll();

        return categories.stream()
                .map(CategoryResponse::from)
                .collect(Collectors.toList());
    }

    public Category getCategoryById(Long categoryId) {
        log.info("카테고리 조회 - ID: {}", categoryId);

        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new BusinessException(CategoryErrorCode.CATEGORY_NOT_FOUND));
    }

    // 요일별 카테고리 조회
    public Category getCategoryByDayOfWeek(Integer dayOfWeek) {
        log.info("요일별 카테고리 조회 - 요일: {}", dayOfWeek);

        return categoryRepository.findByDayOfWeek(dayOfWeek)
                .orElseThrow(() -> new BusinessException(CategoryErrorCode.CATEGORY_NOT_FOUND));
    }

    public Category getTodayCategory() {
        LocalDate today = LocalDate.now();
        DayOfWeek dayOfWeek = today.getDayOfWeek();
        int dayValue = dayOfWeek.getValue(); // 1(월) ~ 7(일)

        log.info("오늘의 카테고리 조회 - 요일: {} ({})", dayOfWeek, dayValue);

        // 주말은 카테고리 없음
        if (dayValue >= 6) {
            throw new BusinessException(CategoryErrorCode.CATEGORY_NOT_FOUND, "주말에는 카테고리가 없습니다.");
        }

        return getCategoryByDayOfWeek(dayValue);
    }

    // 특정 날짜 카테고리 조회
    public Category getCategoryByDate(LocalDate date) {
        DayOfWeek dayOfWeek = date.getDayOfWeek();
        int dayValue = dayOfWeek.getValue();

        log.info("날짜별 카테고리 조회 - 날짜: {}, 요일: {}", date, dayOfWeek);

        if (dayValue >= 6) {
            throw new BusinessException(CategoryErrorCode.CATEGORY_NOT_FOUND, "주말에는 카테고리가 없습니다.");
        }

        return getCategoryByDayOfWeek(dayValue);
    }
}
