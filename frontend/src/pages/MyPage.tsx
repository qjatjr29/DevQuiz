import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  User,
  Bell,
  LogOut,
  BookOpen,
  Trophy,
  Settings,
  HelpCircle,
} from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const MyPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  // 메뉴 리스트
  const menuItems = [
    {
      icon: BookOpen,
      label: "내 풀이 기록",
      sublabel: "학습 기록 확인",
      path: "/records",
    },
    {
      icon: Trophy,
      label: "오답 노트",
      sublabel: "틀린 문제 복습",
      path: "/records",
    },
    { icon: Bell, label: "알림 설정", sublabel: "푸시 알림 관리", path: "#" },
    { icon: Settings, label: "앱 설정", sublabel: "테마, 언어 등", path: "#" },
    { icon: HelpCircle, label: "도움말", sublabel: "FAQ 및 문의", path: "#" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <MobileLayout>
      {/* 상단 헤더: 뒤로가기 및 제목 */}
      <header className="flex items-center px-6 py-5 justify-between bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center size-10 rounded-full hover:bg-secondary transition-colors"
        >
          <ArrowLeft size={24} className="text-muted-foreground" />
        </button>
        <h1 className="font-display font-bold text-lg text-foreground">
          마이페이지
        </h1>
        <div className="size-10" />
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-24">
        {/* 사용자 프로필 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="my-6"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                {/* 사용자 아바타 이미지 */}
                <div
                  className="size-16 rounded-full bg-cover bg-center border-2 border-primary ring-2 ring-primary/30"
                  style={{ backgroundImage: `url(${user?.avatar})` }}
                />
                <button className="absolute -bottom-1 -right-1 size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <User size={12} />
                </button>
              </div>
              <div className="flex-1">
                <p className="font-display font-bold text-lg text-foreground">
                  {user?.name}
                </p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="text-center">
                <p className="font-display font-bold text-xl text-foreground">
                  {user?.level}
                </p>
                <p className="text-xs text-muted-foreground">레벨</p>
              </div>
              <div className="text-center">
                <p className="font-display font-bold text-xl text-primary">
                  {user?.points.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">포인트</p>
              </div>
              <div className="text-center">
                <p className="font-display font-bold text-xl text-foreground">
                  {user?.title}
                </p>
                <p className="text-xs text-muted-foreground">칭호</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 요약 통계 - 퀴즈 횟수 및 정답률 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <div className="p-4 rounded-xl bg-card border border-border">
            <p className="text-2xl font-display font-bold text-foreground mb-1">
              24
            </p>
            <p className="text-sm text-muted-foreground">총 퀴즈 수</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <p className="text-2xl font-display font-bold text-success mb-1">
              85%
            </p>
            <p className="text-sm text-muted-foreground">평균 정답률</p>
          </div>
        </motion.div>

        {/* 메뉴 리스트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-secondary flex items-center justify-center">
                  <item.icon
                    size={20}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.sublabel}
                  </p>
                </div>
              </div>
              <ChevronRight
                size={20}
                className="text-muted-foreground group-hover:text-primary transition-colors"
              />
            </Link>
          ))}
        </motion.div>

        {/* 로그아웃 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Button
            variant="outline"
            className="w-full h-12 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" />
            로그아웃
          </Button>
        </motion.div>
      </main>

      <BottomNav />
    </MobileLayout>
  );
};

export default MyPage;
