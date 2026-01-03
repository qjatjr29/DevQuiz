package com.devquiz.content.external.ai;

import com.devquiz.content.entity.Category;
import com.devquiz.content.entity.Difficulty;
import com.devquiz.content.entity.TopicPool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Random;

@Slf4j
@Component
public class ContentPromptBuilder {

    public String buildPrompt(Category category, TopicPool topic) {
        Difficulty difficulty = getRandomDifficulty();
        return buildPrompt(category.getDisplayName(), topic.getTopicName(), difficulty.getName());
    }

    // TODO: 프롬프트 수정 이후 환경변수로 관리
    public String buildPrompt(String categoryDisplayName, String topicName, String difficulty) {
        return String.format("""
            당신은 개발 지식을 쉽게 설명하는 교육 콘텐츠 크리에이터입니다.
            
            주제: %s - %s
            난이도: %s 개발자 대상
            
            다음 형식으로 5-7장의 카드를 만들어주세요:
            
            카드 1 (COVER - 커버):
            - 제목: 핵심 키워드
            - 부제목: 이 지식이 무엇인지 한줄 요약
            - 내용: 2-3문장으로 개념 소개
            
            카드 2-3 (CONCEPT - 개념 설명):
            - 제목: 핵심 개념
            - 부제목: 개념의 핵심 한줄
            - 내용: 2-3문단으로 쉽게 설명 (각 문단은 3-4줄)
            
            카드 4-5 (EXAMPLE - 실전 예시):
            - 제목: 실무 활용 / 사용 예시
            - 부제목: 예시의 핵심
            - 내용: 실제 어떻게 사용되는지 설명
            - 주의사항: 실무에서 주의할 점
            
            카드 6 (CAUTION - 주의사항) 또는 (SUMMARY - 요약):
            - CAUTION인 경우: 흔한 실수, 안티패턴, 주의사항
            - SUMMARY인 경우: 핵심 포인트 3-4가지로 정리
            - 제목: 주의사항 / 핵심 정리
            - 내용: 명확하게 정리
            
            중요한 규칙:
            1. 각 카드의 content는 형식으로 작성
            2. 전문 용어는 한글과 영어를 병기 (예: 프로세스(Process))
            3. 실무 중심으로 설명
            4. 구체적인 예시 포함
            
            다음 JSON 형식으로만 응답해주세요 (다른 설명 없이 JSON만):
            
            {
              "topic": "주제명",
              "category": "카테고리명",
              "difficulty": "INTERMEDIATE",
              "cards": [
                {
                  "order": 1,
                  "type": "COVER",
                  "title: "제목",
                  "content": "내용 (마크다운)",
                },
                {
                  "order": 2,
                  "title": "개념 제목",
                  "type": "CONCEPT",
                  "content": "개념 설명 (마크다운)\\n\\n두 번째 문단",
                }
              ]
            }
            """, categoryDisplayName, topicName, difficulty);
    }

    private Difficulty getRandomDifficulty() {
        Difficulty[] values = Difficulty.values();
        return values[new Random().nextInt(values.length)];
    }
}
