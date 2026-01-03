package com.devquiz.content.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;

import java.util.List;

@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public record AIContentResponse(
        String category,
        String topic,
        String difficulty,
        List<CardData> cards
) {
    @Builder
    @JsonIgnoreProperties(ignoreUnknown = true)
    public record CardData(
            int order,
            String type,
            String title,
            String subtitle,
            String content
    ) {}
}
