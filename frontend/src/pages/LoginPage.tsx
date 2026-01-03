import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Terminal, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSocialLogin = async (provider: "google" | "kakao") => {
    setIsLoading(true);
    try {
      await login(provider);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login("email", email, password);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout showGlow={false}>
      {/* Hero Section 배경 이미지 및 브랜드 로고 */}
      <div className="relative w-full flex-shrink-0">
        <div
          className="bg-cover bg-center flex flex-col justify-end overflow-hidden min-h-[40vh] rounded-b-[2.5rem] relative"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%), 
              url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop')`,
          }}
        >
          {/* 뒤로가기 버튼: 이전 페이지로 이동 */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 z-10 flex size-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/40 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>

          {/* 로고 및 앱 이름 */}
          <div className="relative z-10 px-8 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-3"
            >
              <div className="size-12 rounded-xl bg-primary flex items-center justify-center shadow-neon">
                <Terminal size={24} className="text-primary-foreground" />
              </div>
              <div>
                <span className="text-2xl font-display font-bold text-foreground">
                  DevQuiz
                </span>
                <p className="text-sm text-muted-foreground">
                  개발자를 위한 퀴즈
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex-1 px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">
            로그인
          </h1>
          <p className="text-muted-foreground mb-8">
            계정에 로그인하여 학습 기록을 저장하세요
          </p>

          {/* 소셜 로그인 Buttons */}
          <div className="space-y-3 mb-8">
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl bg-white hover:bg-gray-50 text-gray-900 border-gray-200 font-medium"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <svg className="size-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google로 계속하기
            </Button>

            <Button
              className="w-full h-12 rounded-xl bg-kakao hover:bg-kakao/90 text-kakao-text font-medium"
              onClick={() => handleSocialLogin("kakao")}
              disabled={isLoading}
            >
              <svg
                className="size-5 mr-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 3c-5.52 0-10 3.58-10 8 0 2.83 1.87 5.32 4.68 6.72-.2.73-.73 2.64-.84 3.05-.14.52.19.51.4.37.17-.11 2.64-1.79 3.71-2.51.66.1 1.35.15 2.05.15 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
              </svg>
              카카오로 계속하기
            </Button>
          </div>

          {/* 구분선 */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">또는</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 pl-12 rounded-xl bg-secondary border-border"
              />
            </div>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 pl-12 pr-12 rounded-xl bg-secondary border-border"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {/* 로그인 실행 버튼 */}
            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-neon"
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            계정이 없으신가요?{" "}
            <button className="text-primary font-semibold hover:underline">
              회원가입
            </button>
          </p>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default LoginPage;
