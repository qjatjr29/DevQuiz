import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

// 사용자 정보 인터페이스 정의
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  level: number;
  title: string;
  points: number;
}

// 인증 컨텍스트에서 제공할 데이터, 함수의 타입 정의
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    provider: "google" | "kakao" | "email",
    email?: string,
    password?: string
  ) => Promise<void>;
  logout: () => void;
}

// 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUser: User = {
  id: "1",
  email: "dev@example.com",
  name: "DevMaster",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
  level: 42,
  title: "Grand Master",
  points: 2450,
};

// 인증 상태를 하위 컴포넌트에 공급하는 Provider 컴포넌트
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 로그인 로직 (useCallback으로 메모이제이션하여 성능 최적화)
  const login = useCallback(
    async (
      provider: "google" | "kakao" | "email",
      email?: string,
      password?: string
    ) => {
      // 실제 앱에서는 여기서 백엔드 API를 호출
      // 현재는 1초 대기 후 가짜 데이터를 세팅
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUser(mockUser);
    },
    []
  );

  // 로그아웃 로직
  const logout = useCallback(() => {
    setUser(null);
  }, []);

  // 하위 컴포넌트들에게 유저 상태와 로그인/로그아웃 함수를 전달
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 컨텍스트를 쉽게 사용하기 위한 커스텀 훅
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth는 AuthProvider 안에서 사용해야 합니다.");
  }
  return context;
}
