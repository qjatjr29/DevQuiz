import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  X,
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { knowledgeCards } from "@/data/mockData";

const KnowledgePage = () => {
  const navigate = useNavigate();

  // 상태 관리: 현재 카드 인덱스와 애니메이션 방향(왼쪽/오른쪽)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const totalCards = knowledgeCards.length;
  const isLastCard = currentIndex === totalCards - 1;
  const currentCard = knowledgeCards[currentIndex];

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  /**
   * 드래그(스와이프) 종료 시 호출되는 핸들러
   * 일정 거리(swipeThreshold) 이상 드래그하면 카드를 넘김
   */
  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && currentIndex < totalCards - 1) {
      handleNext();
    } else if (info.offset.x > swipeThreshold && currentIndex > 0) {
      handlePrev();
    }
  };

  // 카드가 들어오고 나갈 때의 애니메이션 정의
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <MobileLayout>
      {/* Background 움직이는 그라데이션 */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-[-20%] left-[-20%] w-[140%] h-[80%] bg-gradient-blob animate-pulse"
          style={{ animationDuration: "5s" }}
        />
        <div className="absolute bottom-[-10%] right-[-10%] w-full h-[60%] bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.15),transparent_60%)]" />
      </div>

      {/* 헤더: 닫기 버튼, DevQuiz, 현재 진행률(페이지 번호) */}
      <header className="relative z-20 flex items-center justify-between p-6 pb-2">
        <button
          onClick={() => navigate("/")}
          className="text-muted-foreground hover:text-foreground transition-colors flex size-10 items-center justify-center rounded-full hover:bg-white/10"
        >
          <X size={28} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            DevQuiz
          </span>
        </div>
        <div className="flex items-center justify-end">
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <p className="text-muted-foreground text-sm font-bold leading-none tracking-wide">
              {currentIndex + 1} / {totalCards}
            </p>
          </div>
        </div>
      </header>

      {/* Card 영역: 지식 카드가 렌더링 */}
      <main
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 w-full"
        style={{ perspective: "1000px" }}
      >
        {/* Background card indicator */}
        <div className="absolute w-[90%] h-[65%] top-[12%] bg-white/5 rounded-2xl border border-white/5 scale-95 translate-y-4 opacity-50 z-0" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="relative w-full glass-panel rounded-2xl shadow-glass overflow-hidden flex flex-col z-10 group cursor-grab active:cursor-grabbing"
          >
            {/* 카드 상단 - 이미지 / 카테고리 */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-highlight">
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10" />
              <img
                src={currentCard.imageUrl}
                alt={currentCard.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground shadow-neon">
                  {currentCard.category}
                </span>
              </div>
            </div>

            {/* 카드 제목, 설명, 키워드 */}
            <div className="flex flex-col gap-3 p-6 pt-2">
              <h2 className="text-foreground text-3xl font-bold leading-tight tracking-tight font-display">
                {currentCard.title}
              </h2>
              <div className="h-1 w-12 bg-primary rounded-full mb-1" />
              <p className="text-muted-foreground text-base font-normal leading-relaxed">
                {currentCard.description}
              </p>
              <div className="mt-2 flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wider">
                <GraduationCap size={16} />
                <span>{currentCard.keyword}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 페이지네이션 dot */}
        <div className="mt-8 mb-4">
          <div className="flex flex-row items-center justify-center gap-2">
            {knowledgeCards.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-6 bg-primary shadow-neon"
                    : "w-1.5 bg-surface-highlight"
                }`}
              />
            ))}
          </div>
        </div>
      </main>

      {/* 액션 Button 영역 */}
      <div className="relative z-20 w-full p-6 pt-0 bg-gradient-to-t from-background via-background to-transparent">
        {isLastCard ? (
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex-1 h-14 rounded-xl border-white/10 bg-white/5 text-muted-foreground font-bold"
            >
              <ArrowLeft size={20} className="mr-2" />
              메인으로
            </Button>
            <Button
              onClick={() => navigate("/quiz")}
              className="flex-[2] h-14 rounded-xl bg-primary text-primary-foreground font-bold shadow-neon btn-press"
            >
              <Sparkles size={20} className="mr-2" />
              퀴즈 풀러가기
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex-1 h-14 rounded-xl border-white/10 bg-white/5 text-muted-foreground font-bold"
            >
              <ArrowLeft size={20} className="mr-2" />
              메인으로
            </Button>
            <Button
              onClick={handleNext}
              className="flex-[2] h-14 rounded-xl bg-primary text-primary-foreground font-bold shadow-neon btn-press"
            >
              다음 카드
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default KnowledgePage;
