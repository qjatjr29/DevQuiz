import { ReactNode } from "react";
import { motion } from "framer-motion";

interface MobileLayoutProps {
  children: ReactNode;
  showGlow?: boolean; // 배경광 효과 표시 여부
}

/**
 * MobileLayout: 앱의 기본 모바일 프레임 레이아웃
 * 데스크톱에서도 모바일 앱 느낌이 나도록 중앙에 고정된 프레임을 생성
 */
export function MobileLayout({ children, showGlow = true }: MobileLayoutProps) {
  return (
    // 배경 전체를 채우고 컨텐츠를 중앙 정렬
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* 실제 모바일 크기의 컨테이너 (최대 너비 448px, 둥근 모서리, 그림자 효과) */}
      <div className="relative flex w-full max-w-md min-h-[calc(100vh-2rem)] max-h-[900px] flex-col overflow-hidden rounded-3xl bg-background border border-border shadow-[0_0_50px_-12px_hsl(var(--primary)/0.25)] ring-1 ring-white/5">
        {children}

        {/* 주변에 퍼지는 조명 효과 (장식용) */}
        {showGlow && (
          <>
            <div className="ambient-glow ambient-glow-primary w-64 h-64 top-20 right-0 -z-10" />
            <div className="ambient-glow ambient-glow-purple w-48 h-48 bottom-0 left-0 -z-10" />
          </>
        )}
      </div>
    </div>
  );
}

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * PageTransition: 페이지 이동 시 부드러운 애니메이션 효과 부여
 * 아래에서 위로 올라오면서 나타나고, 위로 올라가면서 사라지는 효과
 */
export function PageTransition({
  children,
  className = "",
}: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
