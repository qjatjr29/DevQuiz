import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RankingUser } from '@/data/mockData';

interface RankingListProps {
  rankings: RankingUser[];
}

export function RankingList({ rankings }: RankingListProps) {
  return (
    <div className="space-y-3">
      {rankings.map((user, index) => (
        <RankingItem key={user.id} user={user} isTop={index === 0} />
      ))}
    </div>
  );
}

interface RankingItemProps {
  user: RankingUser;
  isTop: boolean;
}

function RankingItem({ user, isTop }: RankingItemProps) {
  if (isTop) {
    return (
      <div className="group relative flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 shadow-neon-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div 
              className="size-12 rounded-full bg-cover bg-center border-2 border-primary ring-2 ring-primary/30"
              style={{ backgroundImage: `url(${user.avatar})` }}
            />
            <div className="absolute -top-2 -right-1 bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center shadow-sm border border-yellow-200">
              <Crown size={12} className="mr-0.5" />
              1
            </div>
          </div>
          <div>
            <p className="font-display font-bold text-foreground">{user.name}</p>
            <p className="text-xs text-primary font-medium">LV. {user.level} • {user.title}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-display font-bold text-lg text-primary">{user.points.toLocaleString()}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Points</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:border-white/10 transition-colors">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div 
            className="size-10 rounded-full bg-cover bg-center border border-border"
            style={{ backgroundImage: `url(${user.avatar})` }}
          />
          <div className="absolute -bottom-1 -right-1 bg-secondary text-muted-foreground text-[10px] font-bold size-5 rounded-full flex items-center justify-center border border-background">
            {user.rank}
          </div>
        </div>
        <div>
          <p className="font-display font-semibold text-sm text-foreground">{user.name}</p>
          <p className="text-[11px] text-muted-foreground">LV. {user.level}</p>
        </div>
      </div>
      <span className="font-display font-bold text-muted-foreground">{user.points.toLocaleString()}</span>
    </div>
  );
}
