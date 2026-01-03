import { Link, useLocation } from "react-router-dom";
import { Home, Trophy, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "홈", path: "/" },
  { icon: Trophy, label: "랭킹", path: "/ranking" },
  { icon: User, label: "마이", path: "/mypage" },
];

export function BottomNav() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // 하단바를 표시하지 않을 경로 설정 (학습, 퀴즈, 로그인 등)
  const hiddenPaths = ["/knowledge", "/quiz", "/login", "/result"];

  // 현재 경로가 hiddenPaths에 포함되어 있다면 아무것도 렌더링하지 않음
  if (hiddenPaths.some((path) => location.pathname.startsWith(path))) {
    return null;
  }

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          const isMyPage = path === "/mypage";

          // 비로그인 사용자가 '마이페이지' 클릭 시 로그인 페이지로 유도
          const linkPath = isMyPage && !isAuthenticated ? "/login" : path;

          return (
            <Link
              key={path}
              to={linkPath}
              className={cn(
                "flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all",
                // 활성화 상태에 따른 색상 변경
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {/* 활성화 상태일 때 아이콘 크기를 약간 키우는 효과(scale-110) 추가 */}
              <Icon
                size={24}
                className={cn("transition-transform", isActive && "scale-110")}
              />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
