import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { BottomNav } from "@/components/layout/BottomNav";
import { RankingList } from "@/components/ranking/RankingList";
import { TabSwitch } from "@/components/ui/tab-switch";
import { weeklyRanking, monthlyRanking } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

const RankingPage = () => {
  const navigate = useNavigate();
  // 랭킹 기간 상태: 'weekly'(주간) 또는 'monthly'(월간)
  const [rankingPeriod, setRankingPeriod] = useState("weekly");
  const { user, isAuthenticated } = useAuth();

  const rankings = rankingPeriod === "weekly" ? weeklyRanking : monthlyRanking;

  // 인증된 사용자인 경우 전체 랭킹 데이터에서 본인의 순위를 검색
  const userRank =
    isAuthenticated && user
      ? rankings.find((r) => r.name === user.name)?.rank
      : null;

  return (
    <MobileLayout>
      {/* 헤더: 뒤로가기 버튼 및 페이지 제목 */}
      <header className="flex items-center px-6 py-5 justify-between bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center size-10 rounded-full hover:bg-secondary transition-colors"
        >
          <ArrowLeft size={24} className="text-muted-foreground" />
        </button>
        <h1 className="font-display font-bold text-lg text-foreground">랭킹</h1>
        <div className="size-10" /> {/* 좌우 균형을 위한 빈 공간(Spacer) */}
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-24">
        {/* 내 랭킹 카드: 로그인 상태이고 내 순위 정보가 있을 때만 상단에 표시 */}
        {isAuthenticated && user && userRank && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-6"
          >
            <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div
                    className="size-14 rounded-full bg-cover bg-center border-2 border-primary ring-2 ring-primary/30"
                    style={{ backgroundImage: `url(${user.avatar})` }}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs font-bold size-6 rounded-full flex items-center justify-center">
                    {userRank}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-display font-bold text-foreground">
                    {user.name}
                  </p>
                  <p className="text-sm text-primary">
                    LV. {user.level} • {user.title}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-lg text-primary">
                    {user.points.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Points
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 기간 전환 탭 영역 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold font-display text-foreground">
                Leaderboard
              </h2>
              <p className="text-sm text-muted-foreground">Top developers</p>
            </div>
            <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-bold font-display">
              SEASON 4
            </div>
          </div>

          <TabSwitch
            tabs={[
              { value: "weekly", label: "주간 랭킹" },
              { value: "monthly", label: "월간 랭킹" },
            ]}
            defaultValue="weekly"
            onChange={setRankingPeriod}
          />
        </motion.div>

        {/* 랭킹 리스트: 필터링된 순위 목록 표시 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <RankingList rankings={rankings} />
        </motion.div>
      </main>

      <BottomNav />
    </MobileLayout>
  );
};

export default RankingPage;
