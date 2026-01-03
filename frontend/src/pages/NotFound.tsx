import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <div className="text-8xl font-display font-bold text-primary mb-4">404</div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-2">페이지를 찾을 수 없어요</h1>
      <p className="text-muted-foreground mb-8">요청하신 페이지가 존재하지 않습니다.</p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => window.history.back()} className="rounded-xl">
          <ArrowLeft size={18} className="mr-2" />뒤로 가기
        </Button>
        <Link to="/"><Button className="rounded-xl bg-primary"><Home size={18} className="mr-2" />홈으로</Button></Link>
      </div>
    </div>
  );
};

export default NotFound;
