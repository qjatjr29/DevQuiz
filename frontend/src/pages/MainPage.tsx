import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Trophy, ChevronRight } from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { RankingList } from "@/components/ranking/RankingList";
import { TabSwitch } from "@/components/ui/tab-switch";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { weeklyRanking, monthlyRanking } from "@/data/mockData";

const MainPage = () => {
  // 랭킹 탭 상태 (주간/월간)
  const [rankingPeriod, setRankingPeriod] = useState("weekly");
  // 로그인 여부와 유저 정보를 가져옴
  const { isAuthenticated, user } = useAuth();

  const rankings = rankingPeriod === "weekly" ? weeklyRanking : monthlyRanking;

  const today = new Date();
  const formattedDate = `${today.getFullYear()}.${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${today.getDate().toString().padStart(2, "0")}`;

  return (
    <MobileLayout>
      <Header />

      <main className="flex-1 overflow-y-auto px-6 pb-24 scroll-smooth">
        {/* 히어로 섹션 - 오늘의 지식 학습*/}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="my-6"
        >
          <Link to="/knowledge">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/70 p-6 shadow-neon group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={20} className="text-primary-foreground/80" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-foreground/80">
                    Today's Knowledge
                  </span>
                </div>

                <h2 className="text-xl font-bold font-display text-primary-foreground mb-2">
                  오늘의 개발 지식
                  <br />
                  확인하러 가기
                </h2>

                <p className="text-sm text-primary-foreground/70 mb-4">
                  새로운 개발 지식을 학습하고 퀴즈로 테스트해보세요
                </p>

                <div className="flex items-center gap-2 text-primary-foreground font-semibold group-hover:gap-3 transition-all">
                  <span>시작하기</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* 유저별 Section (로그인 유저) */}
        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6"
          >
            <Link to="/records">
              <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Trophy size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      내 풀이 기록 / 오답노트
                    </p>
                    <p className="text-xs text-muted-foreground">
                      학습 기록을 확인하세요
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={20}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
              </div>
            </Link>
          </motion.div>
        )}

        {/* 리더보드 섹션 - 다른 유저들의 순위 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="mb-4 mt-2 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold font-display leading-tight text-foreground">
                Leaderboard
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Top developers
              </p>
            </div>
            <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-bold font-display">
              {formattedDate}
            </div>
          </div>

          <div className="mb-6">
            <TabSwitch
              tabs={[
                { value: "weekly", label: "주간 랭킹" },
                { value: "monthly", label: "월간 랭킹" },
              ]}
              defaultValue="weekly"
              onChange={setRankingPeriod}
            />
          </div>

          <RankingList rankings={rankings} />
        </motion.div>
      </main>

      <BottomNav />
    </MobileLayout>
  );
};

export default MainPage;
