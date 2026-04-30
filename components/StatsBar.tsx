'use client';

interface StatsBarProps {
  snippetCount: number;
  updatedAt: string;
}

export default function StatsBar({ snippetCount, updatedAt }: StatsBarProps) {
  return (
    <div
      className="px-4 py-3 flex items-center justify-between text-[10px] tracking-wider border-b font-mono"
      style={{ borderColor: '#2A2A2A', color: '#B0B0B0' }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: '#34C759' }}
        />
        <span>ONLINE</span>
      </div>

      <span style={{ color: '#F37021' }}>{snippetCount} SNIPPETS</span>

      <span>UPDATED {updatedAt}</span>
    </div>
  );
}
