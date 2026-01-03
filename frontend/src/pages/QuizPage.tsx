import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Timer, MoreHorizontal, ArrowRight, Check } from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { quizQuestions } from "@/data/mockData";
import { cn } from "@/lib/utils";

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quizQuestions.length).fill(null)
  );
  const [timer, setTimer] = useState(600); // 제한 시간 10분

  const totalQuestions = quizQuestions.length;
  const currentQuestion = quizQuestions[currentIndex];
  const progress = ((currentIndex + 1) / totalQuestions) * 100; // 진행도 계산

  // 타이머 로직
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          navigate("/result", { state: { answers, questions: quizQuestions } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  // 다음 또는 결과 보기 버튼 클릭 시 호출
  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      // 마지막 문제라면 결과 페이지로 이동하며 데이터 전달
      navigate("/result", {
        state: { answers: newAnswers, questions: quizQuestions },
      });
    }
  };

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <MobileLayout>
      {/* 헤더: 나가기 버튼, 남은 시간 표시, 추가 옵션 */}
      <header className="flex items-center justify-between p-4 pb-2 pt-6 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center size-10 rounded-full hover:bg-secondary transition-colors text-muted-foreground"
        >
          <X size={24} />
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border">
          <Timer size={14} className="text-primary animate-pulse" />
          <span className="text-sm font-bold tracking-tight text-primary font-mono">
            {formatTime(timer)}
          </span>
        </div>
        <button className="flex items-center justify-center size-10 rounded-full hover:bg-secondary transition-colors text-muted-foreground">
          <MoreHorizontal size={24} />
        </button>
      </header>

      {/* 프로그레스 바: 현재 몇 번째 문제인지 시각적으로 표시 */}
      <div className="px-6 py-2">
        <div className="flex justify-between items-end mb-2">
          <p className="text-muted-foreground text-sm font-medium">
            Question {currentIndex + 1}
            <span className="text-muted-foreground/50">/{totalQuestions}</span>
          </p>
          <div className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
            {currentQuestion.category}
          </div>
        </div>
        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }} // 진행도 애니메이션
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* 퀴즈 내용 영역 */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* 카테고리 */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-lg bg-primary/10 border border-primary/20">
              <span
                className="size-1.5 rounded-full bg-primary animate-ping"
                style={{ animationDuration: "1.5s" }}
              />
              <span className="text-primary text-xs font-bold uppercase tracking-wider">
                {currentQuestion.category}
              </span>
            </div>

            {/* 질문 텍스트 */}
            <h2 className="text-2xl font-bold leading-tight mb-6 text-foreground">
              {currentQuestion.question}
            </h2>

            {/* 코드 스니펫 (문제에 코드가 포함된 경우에만 렌더링) */}
            {currentQuestion.code && (
              <div className="relative group rounded-xl bg-[#1E1E1E] border border-border p-4 mb-8 overflow-hidden shadow-lg">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-primary to-purple-500 opacity-70" />
                <div className="flex gap-1.5 mb-3 opacity-50">
                  <div className="size-2.5 rounded-full bg-red-500" />
                  <div className="size-2.5 rounded-full bg-yellow-500" />
                  <div className="size-2.5 rounded-full bg-green-500" />
                </div>
                <pre className="font-mono text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                  {currentQuestion.code}
                </pre>
              </div>
            )}

            {/* 객관식 보기 버튼 리스트 */}
            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    className={cn(
                      "relative w-full p-4 rounded-xl border-2 text-left transition-all duration-200",
                      isSelected
                        ? "border-primary bg-primary/5 shadow-neon-sm"
                        : "border-border bg-card/40 hover:bg-secondary"
                    )}
                  >
                    {isSelected && (
                      <div className="absolute -right-1 -top-1">
                        <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px]">
                          <Check size={14} />
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "flex items-center justify-center size-8 rounded-lg font-bold border transition-colors",
                          isSelected
                            ? "bg-primary text-primary-foreground border-transparent"
                            : "bg-secondary text-muted-foreground border-border"
                        )}
                      >
                        {optionLabels[index]}
                      </div>
                      <span
                        className={cn(
                          "text-base font-medium font-mono",
                          isSelected
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 버튼: 다음으로 넘어가기 */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background to-transparent z-20">
        <Button
          onClick={handleSubmitAnswer}
          disabled={selectedAnswer === null}
          className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-neon btn-press disabled:opacity-50 disabled:shadow-none"
        >
          {currentIndex === totalQuestions - 1 ? "결과 보기" : "다음 문제"}
          <ArrowRight size={20} className="ml-2" />
        </Button>
      </div>
    </MobileLayout>
  );
};

export default QuizPage;
