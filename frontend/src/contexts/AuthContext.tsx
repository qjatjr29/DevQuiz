import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  level: number;
  title: string;
  points: number;
}

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(
    async (
      provider: "google" | "kakao" | "email",
      email?: string,
      password?: string
    ) => {
      // Mock login - in real app, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUser(mockUser);
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
