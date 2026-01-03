package com.devquiz.content.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "topic_pool")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TopicPool {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false, length = 200)
    private String topicName;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDate lastUsedDate;

    @Builder.Default
    @Column(nullable = false, columnDefinition = "int default 0")
    private int useCount = 0;

    public void markAsUsed(LocalDate date) {
        this.lastUsedDate = date;
        this.useCount++;
    }

}