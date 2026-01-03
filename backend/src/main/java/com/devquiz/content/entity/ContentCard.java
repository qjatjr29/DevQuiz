package com.devquiz.content.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "content_card", indexes = {
        @Index(name = "idx_card_daily_content", columnList = "daily_content_id, cardOrder")
})
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ContentCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "daily_content_id", nullable = false)
    private DailyContent dailyContent;

    @Column(nullable = false)
    private int cardOrder;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private CardType cardType;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

}
