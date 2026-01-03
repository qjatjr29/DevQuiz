package com.devquiz.user;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "user_stats")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserStats {
    @Id
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    private int totalScore = 0;
    private int currentStreak = 0;
    private int maxStreak = 0;
    private int totalQuizCount = 0;
    private int totalCorrectCount = 0;
    private LocalDate lastQuizDate;
}