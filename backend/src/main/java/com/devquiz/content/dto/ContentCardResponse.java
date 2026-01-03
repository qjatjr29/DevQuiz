package com.devquiz.content.dto;

import com.devquiz.content.entity.ContentCard;
import lombok.Builder;

@Builder
public record ContentCardResponse(
        Long id,
        Integer cardOrder,
        String cardType,
        String content
) {
    public static ContentCardResponse from(ContentCard card) {
        return ContentCardResponse.builder()
                .id(card.getId())
                .cardOrder(card.getCardOrder())
                .cardType(card.getCardType().name())
                .content(card.getContent())
                .build();
    }
}
