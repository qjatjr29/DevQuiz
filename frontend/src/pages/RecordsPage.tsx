import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  BookOpen,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  Filter,
} from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { BottomNav } from "@/components/layout/BottomNav";
import { TabSwitch } from "@/components/ui/tab-switch";
import { useAuth } from "@/contexts/AuthContext";
import { quizHistory } from "@/data/mockData";
import { cn } from "@/lib/utils";

const RecordsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // 상태 관리: 현재 선택된 탭 ('history' 또는 'wrong'), 확장된 기록 ID
  const [activeTab, setActiveTab] = useState("history");
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);

  // 로그인하지 않은 사용자는 로그인 페이지 이동
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  // 아코디언 토글 함수: 이미 열려있으면 닫고 아니면 해당 ID를 열음
  const toggleExpand = (id: string) => {
    setExpandedRecord((prev) => (prev === id ? null : id));
  };

  // quiz 기록들에서 오답들만 추출
  const allWrongAnswers = quizHistory.flatMap((record) =>
    record.wrongAnswers.map((q) => ({
      ...q,
      date: record.date,
      topic: record.topic,
    }))
  );

  return (
    <MobileLayout>
      {/* 헤더 섹션: 뒤로가기, 타이틀, 필터 버튼 */}
      <header className="flex items-center px-6 py-5 justify-between bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center size-10 rounded-full hover:bg-secondary transition-colors"
        >
          <ArrowLeft size={24} className="text-muted-foreground" />
        </button>
        <h1 className="font-display font-bold text-lg text-foreground">
          학습 기록
        </h1>
        <button className="flex items-center justify-center size-10 rounded-full hover:bg-secondary transition-colors">
          <Filter size={20} className="text-muted-foreground" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-24">
        {/* 탭 스위치: 퀴즈 기록과 오답 노트 전환 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="my-6"
        >
          <TabSwitch
            tabs={[
              { value: "history", label: "풀이 기록" },
              { value: "wrong", label: "오답 노트" },
            ]}
            defaultValue="history"
            onChange={setActiveTab}
          />
        </motion.div>

        {/* 탭 콘텐츠 영역 */}
        <AnimatePresence mode="wait">
          {/* quiz 기록 리스트 */}
          {activeTab === "history" ? (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {quizHistory.map((record, index) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl bg-card border border-border overflow-hidden"
                >
                  {/* 기록 카드 요약본 (클릭 시 확장) */}
                  <button
                    onClick={() => toggleExpand(record.id)}
                    className="w-full p-4 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      {/* 점수에 따른 색상 차별화 (80점이상 성공, 60점이상 보통, 미만 위험) */}
                      <div
                        className={cn(
                          "size-12 rounded-xl flex items-center justify-center",
                          record.score >= 80
                            ? "bg-success/20"
                            : record.score >= 60
                            ? "bg-primary/20"
                            : "bg-destructive/20"
                        )}
                      >
                        <span
                          className={cn(
                            "font-display font-bold text-lg",
                            record.score >= 80
                              ? "text-success"
                              : record.score >= 60
                              ? "text-primary"
                              : "text-destructive"
                          )}
                        >
                          {record.score}%
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {record.topic}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar size={12} />
                          <span>{record.date}</span>
                          <span>•</span>
                          <span>
                            {record.correctAnswers}/{record.totalQuestions} 정답
                          </span>
                        </div>
                      </div>
                    </div>
                    {expandedRecord === record.id ? (
                      <ChevronUp size={20} className="text-muted-foreground" />
                    ) : (
                      <ChevronDown
                        size={20}
                        className="text-muted-foreground"
                      />
                    )}
                  </button>

                  {/* 확장 시 노출되는 상세 정보 (애니메이션 적용) */}
                  <AnimatePresence>
                    {expandedRecord === record.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-border"
                      >
                        <div className="p-4 space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              총 문제
                            </span>
                            <span className="font-medium text-foreground">
                              {record.totalQuestions}문제
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">정답</span>
                            <span className="font-medium text-success flex items-center gap-1">
                              <Check size={14} />
                              {record.correctAnswers}문제
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">오답</span>
                            <span className="font-medium text-destructive flex items-center gap-1">
                              <X size={14} />
                              {record.wrongAnswers.length}문제
                            </span>
                          </div>
                          {/* 틀린 문제 질문 리스트 추출 */}
                          {record.wrongAnswers.length > 0 && (
                            <div className="pt-3 border-t border-border">
                              <p className="text-sm text-muted-foreground mb-2">
                                틀린 문제:
                              </p>
                              <div className="space-y-2">
                                {record.wrongAnswers.map((q, i) => (
                                  <div
                                    key={i}
                                    className="text-sm text-foreground bg-secondary/50 p-2 rounded-lg"
                                  >
                                    {q.question}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* [탭 2] 오답 노트 리스트 */
            <motion.div
              key="wrong"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {allWrongAnswers.length === 0 ? (
                /* 오답이 없을 때 보여주는 빈 화면 */
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="size-16 rounded-full bg-success/20 flex items-center justify-center mb-4">
                    <Check size={32} className="text-success" />
                  </div>
                  <p className="font-semibold text-foreground mb-2">
                    아직 오답이 없어요!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    계속해서 좋은 성적을 유지하세요
                  </p>
                </div>
              ) : (
                /* 오답 카드 상세 리스트 */
                allWrongAnswers.map((question, index) => (
                  <motion.div
                    key={`${question.id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold uppercase">
                        {question.category}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                        <Calendar size={12} />
                        <span>{question.date}</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-foreground mb-3">
                      {question.question}
                    </p>
                    <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                      <p className="text-xs text-muted-foreground mb-1">
                        정답:
                      </p>
                      <p className="text-sm font-medium text-success">
                        {question.options[question.correctAnswer]}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      {question.explanation}
                    </p>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav />
    </MobileLayout>
  );
};

export default RecordsPage;
