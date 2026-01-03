import { Bell, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  showNotification?: boolean;
}

export function Header({ showNotification = true }: HeaderProps) {
  return (
    <header className="flex items-center px-6 py-5 justify-between bg-background/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/5">
      <Link
        to="/"
        className="flex items-center gap-2 text-primary font-display"
      >
        <Terminal size={28} />
        <span className="text-xl font-bold tracking-tight">DevQuiz</span>
      </Link>

      {showNotification && (
        <button className="relative flex items-center justify-center size-10 rounded-full hover:bg-secondary transition-colors">
          <Bell size={22} className="text-muted-foreground" />
          <span className="absolute top-2 right-2 size-2 bg-destructive rounded-full border-2 border-background" />
        </button>
      )}
    </header>
  );
}
