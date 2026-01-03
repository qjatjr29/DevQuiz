package com.devquiz.content.dto;

import com.devquiz.content.entity.DailyContent;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

@Builder
public record DailyContentDetailResponse(
        Long id,
        LocalDate date,
        String categoryName,
        String categoryDisplayName,
        String topic,
        String difficulty,
        Boolean isReview,
        List<ContentCardResponse> cards
) {
    public static DailyContentDetailResponse of(DailyContent content, List<ContentCardResponse> cards) {
        return DailyContentDetailResponse.builder()
                .id(content.getId())
                .date(content.getDate())
                .categoryName(content.getCategory().getName())
                .categoryDisplayName(content.getCategory().getDisplayName())
                .topic(content.getTopic())
                .difficulty(content.getDifficulty().name())
                .isReview(content.getIsReview())
                .cards(cards)
                .build();
    }
}
