package com.devquiz.content.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "daily_content")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DailyContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_pool_id")
    private TopicPool topicPool;

    @Column(nullable = false, length = 200)
    private String topic;

    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Builder.Default
    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private ContentStatus status = ContentStatus.DRAFT;

    // 주말 복습 여부
    @Builder.Default
    @Column(nullable = false)
    private Boolean isReview = false;

    // 주말 복습인 경우 원본 콘텐츠 ID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "original_content_id")
    private DailyContent originalContent;

    private LocalDateTime publishedAt;

    @Builder.Default
    @OrderBy("cardOrder ASC")
    @OneToMany(mappedBy = "dailyContent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ContentCard> cards = new ArrayList<>();

    public void addCard(ContentCard card) {
        this.cards.add(card);
    }

    public void publish() {
        this.status = ContentStatus.PUBLISHED;
        this.publishedAt = LocalDateTime.now();
    }

    public boolean isPublished() {
        return this.status == ContentStatus.PUBLISHED;
    }
}