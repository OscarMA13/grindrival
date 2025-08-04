"use client";

import { useState } from "react";
import { Home, Dumbbell, Trophy, Settings } from "lucide-react";

type Tab = "home" | "workouts" | "rank" | "settings";

interface TopbarProps {
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

export default function Topbar({ activeTab = "home", onTabChange }: TopbarProps) {
  const [currentTab, setCurrentTab] = useState<Tab>(activeTab);

  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab);
    onTabChange?.(tab);
  };

  const tabs = [
    { id: "home" as const, label: "Home", icon: Home },
    { id: "workouts" as const, label: "Workouts", icon: Dumbbell },
    { id: "rank" as const, label: "Rank", icon: Trophy },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-full bg-card border-b border-border shadow-sm">
      <div className="flex items-center justify-center px-4 py-2">
        <nav className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}