package com.devquiz.content.dto;

import com.devquiz.content.entity.Category;
import lombok.Builder;

@Builder
public record CategoryResponse(
        Long id,
        String name,
        String displayName,
        String description,
        Integer dayOfWeek
) {

    public static CategoryResponse from(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .displayName(category.getDisplayName())
                .dayOfWeek(category.getDayOfWeek())
                .build();
    }
}
