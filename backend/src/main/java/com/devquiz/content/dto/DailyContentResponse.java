package com.devquiz.content.dto;

import com.devquiz.content.entity.DailyContent;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record DailyContentResponse(
        Long id,
        LocalDate date,
        String categoryName,
        String categoryDisplayName,
        String topic,
        String difficulty,
        Boolean isReview
) {
    public static DailyContentResponse from(DailyContent content) {
        return DailyContentResponse.builder()
                .id(content.getId())
                .date(content.getDate())
                .categoryName(content.getCategory().getName())
                .categoryDisplayName(content.getCategory().getDisplayName())
                .topic(content.getTopic())
                .difficulty(content.getDifficulty().name())
                .isReview(content.getIsReview())
                .build();
    }
}