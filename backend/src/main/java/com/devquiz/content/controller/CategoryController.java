package com.devquiz.content.controller;

import com.devquiz.common.response.ApiResponse;
import com.devquiz.content.dto.CategoryResponse;
import com.devquiz.content.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ApiResponse<List<CategoryResponse>> getAllCategories() {
        List<CategoryResponse> categories = categoryService.getAllCategories();
        return ApiResponse.success(categories);
    }

    @GetMapping("/day/{dayOfWeek}")
    public ApiResponse<CategoryResponse> getCategoryByDay(@PathVariable Integer dayOfWeek) {
        CategoryResponse category = CategoryResponse.from(
                categoryService.getCategoryByDayOfWeek(dayOfWeek)
        );
        return ApiResponse.success(category);
    }

    @GetMapping("/today")
    public ApiResponse<CategoryResponse> getTodayCategory() {
        CategoryResponse category = CategoryResponse.from(
                categoryService.getTodayCategory()
        );
        return ApiResponse.success(category);
    }
}
