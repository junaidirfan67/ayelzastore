import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: {
    value: string;
    positive: boolean;
  };
  icon: LucideIcon;
  badge?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  change,
  icon: Icon,
  badge,
}) => {
  return (
    <div className="bg-white rounded border border-brand-border/80 p-5 shadow-sm hover:shadow-subtle transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-muted">
          {title}
        </span>
        <div className="w-9 h-9 rounded bg-brand-sand flex items-center justify-center text-brand-rose shrink-0">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-serif text-2xl font-bold text-brand-charcoal">
          {value}
        </h3>
        {badge && (
          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-brand-sand text-brand-charcoal">
            {badge}
          </span>
        )}
      </div>

      {(subtitle || change) && (
        <div className="flex items-center gap-2 mt-2 text-xs">
          {change && (
            <span
              className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${
                change.positive ? "text-emerald-700" : "text-red-600"
              }`}
            >
              {change.positive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {change.value}
            </span>
          )}
          {subtitle && (
            <span className="text-[11px] text-brand-muted truncate">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
