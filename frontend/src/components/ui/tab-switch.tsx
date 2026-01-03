import { useState } from "react";
import { cn } from "@/lib/utils";

interface TabSwitchProps {
  tabs: { value: string; label: string }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function TabSwitch({ tabs, defaultValue, onChange }: TabSwitchProps) {
  const [active, setActive] = useState(defaultValue || tabs[0].value);

  const handleChange = (value: string) => {
    setActive(value);
    onChange?.(value);
  };

  return (
    <div className="p-1 bg-secondary rounded-xl flex border border-white/5">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleChange(tab.value)}
          className={cn(
            "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
            active === tab.value
              ? "bg-surface-highlight text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
