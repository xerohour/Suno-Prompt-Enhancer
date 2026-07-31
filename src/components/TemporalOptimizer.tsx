import React, { useEffect, useState } from "react";
import { Clock, AlertTriangle, CheckCircle, Info } from "lucide-react";

export const TemporalOptimizer: React.FC = () => {
  const [timeState, setTimeState] = useState<{
    zone: "green" | "yellow" | "red";
    message: string;
    details: string;
  }>({
    zone: "yellow",
    message: "Checking temporal alignment...",
    details: ""
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const time = hours + minutes / 60;

      if (time >= 3 && time < 4.5) {
        setTimeState({
          zone: "green",
          message: "Optimal Generation Window",
          details: "You are in the peak performance window (3:00 AM - 4:30 AM). Expect higher audio fidelity and better instruction adherence."
        });
      } else if (time >= 8 && time < 22) {
        setTimeState({
          zone: "red",
          message: "High Server Load Window",
          details: "Current time (8 AM - 10 PM) typically sees highest server load. You may experience more generic outputs or degraded audio quality."
        });
      } else {
        setTimeState({
          zone: "yellow",
          message: "Standard Generation Window",
          details: "Server load is moderate. Output quality should be standard. The absolute best time is 3:00 AM - 4:30 AM."
        });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const config = {
    green: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      icon: CheckCircle
    },
    yellow: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-400",
      icon: Info
    },
    red: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: "text-red-400",
      icon: AlertTriangle
    }
  };

  const currentConfig = config[timeState.zone];
  const Icon = currentConfig.icon;

  return (
    <div className={`mt-4 p-3 rounded-xl border flex items-start gap-3 transition-colors ${currentConfig.bg} ${currentConfig.border}`}>
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${currentConfig.text}`} />
      <div>
        <h4 className={`text-xs font-bold ${currentConfig.text} uppercase tracking-wider`}>
          Temporal Status: {timeState.message}
        </h4>
        <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
          {timeState.details}
        </p>
      </div>
    </div>
  );
};
