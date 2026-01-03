import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  RotateCcw,
  BookmarkPlus,
  Share2,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  LogIn,
} from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { QuizQuestion } from "@/data/mockData";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ResultState {
  answers: (number | null)[];
  questions: QuizQuestion[];
}

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  // 오답 상세 보기(아코디언) 상태 관리
  const [expandedWrong, setExpandedWrong] = useState<string[]>([]);

  // 퀴즈 페이지에서 넘겨준 결과 데이터(state)를 가져옴
  const state = location.state as ResultState | undefined;

  if (!state) {
    navigate("/");
    return null;
  }

  const { answers, questions } = state;

  // 정답 개수 계산
  const correctCount = answers.reduce((count, answer, index) => {
    return answer === questions[index].correctAnswer ? count + 1 : count;
  }, 0);

  const totalQuestions = questions.length;
  const score = Math.round((correctCount / totalQuestions) * 100);
  const wrongAnswers = questions.filter(
    (q, index) => answers[index] !== q.correctAnswer
  );

  const toggleWrongExpand = (id: string) => {
    setExpandedWrong((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // SVG 원형 프로그레스 바 계산
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <MobileLayout>
      {/* 상단 헤더: 홈 이동, 제목, 공유 버튼 */}
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-background/90 backdrop-blur-md">
        <button
          onClick={() => navigate("/")}
          className="flex size-10 items-center justify-center rounded-full hover:bg-secondary transition-colors"
        >
          <X size={24} className="text-muted-foreground" />
        </button>
        <h1 className="font-display font-bold text-lg text-foreground">
          퀴즈 결과
        </h1>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-secondary transition-colors">
          <Share2 size={20} className="text-muted-foreground" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-8">
        {/* 점수 섹션: 원형 애니메이션 그래프와 정답, 오답 개수 표시 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center py-8"
        >
          <div className="relative size-40">
            <svg
              className="w-full h-full progress-circle"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--secondary))"
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-display font-bold text-foreground">
                {score}%
              </span>
              <span className="text-sm text-muted-foreground">정답률</span>
            </div>
          </div>

          <div className="flex gap-8 mt-6">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-success">
                <Check size={18} />
                <span className="text-2xl font-bold font-display">
                  {correctCount}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">정답</span>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-destructive">
                <X size={18} />
                <span className="text-2xl font-bold font-display">
                  {totalQuestions - correctCount}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">오답</span>
            </div>
          </div>
        </motion.div>

        {/* 비로그인 사용자용 안내: 기록 저장 유도 */}
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20"
          >
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <LogIn size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  기록을 저장하려면 로그인하세요
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  로그인하면 풀이 기록과 오답 노트를 저장할 수 있어요.
                </p>
                <Link to="/login">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    로그인하기
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* 오답 노트 섹션: 틀린 문제가 있을 때만 렌더링 */}
        {wrongAnswers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="font-display font-bold text-lg text-foreground mb-4">
              틀린 문제 ({wrongAnswers.length})
            </h2>
            <div className="space-y-3">
              {wrongAnswers.map((question) => {
                const isExpanded = expandedWrong.includes(question.id);
                return (
                  <div
                    key={question.id}
                    className="rounded-xl bg-card border border-border overflow-hidden"
                  >
                    <button
                      onClick={() => toggleWrongExpand(question.id)}
                      className="w-full p-4 flex items-center justify-between text-left"
                    >
                      <div className="flex-1 pr-4">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                          {question.category}
                        </span>
                        <p className="text-sm font-medium text-foreground mt-1 line-clamp-2">
                          {question.question}
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp
                          size={20}
                          className="text-muted-foreground"
                        />
                      ) : (
                        <ChevronDown
                          size={20}
                          className="text-muted-foreground"
                        />
                      )}
                    </button>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 border-t border-border"
                      >
                        <div className="pt-4">
                          <p className="text-sm text-muted-foreground mb-2">
                            정답:
                          </p>
                          <p className="text-sm font-medium text-success">
                            {question.options[question.correctAnswer]}
                          </p>
                          <p className="text-sm text-muted-foreground mt-3 mb-2">
                            해설:
                          </p>
                          <p className="text-sm text-foreground">
                            {question.explanation}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 space-y-3"
        >
          {isAuthenticated && (
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl border-primary/30 text-primary hover:bg-primary/10"
            >
              <BookmarkPlus size={18} className="mr-2" />
              오답 노트에 추가
            </Button>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/quiz")}
              className="flex-1 h-12 rounded-xl"
            >
              <RotateCcw size={18} className="mr-2" />
              다시 풀기
            </Button>
            <Button
              onClick={() => navigate("/")}
              className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90"
            >
              <Home size={18} className="mr-2" />
              홈으로
            </Button>
          </div>
        </motion.div>
      </main>
    </MobileLayout>
  );
};

export default ResultPage;
