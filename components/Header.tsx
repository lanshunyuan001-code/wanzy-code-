'use client';

import Link from 'next/link';

export default function Header({ onlineCount }: { onlineCount: number }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ backgroundColor: 'rgba(10,10,10,0.85)', borderColor: '#2A2A2A', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded border flex items-center justify-center"
            style={{ borderColor: '#2A2A2A', backgroundColor: '#121212' }}>
            <span className="text-xs font-bold" style={{ color: '#F37021' }}>W</span>
          </div>
          <span className="text-sm font-medium text-white group-hover:opacity-80 transition-opacity">
            wanzy.code
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: '#B0B0B0' }}>tools</span>
            <span className="text-xs font-bold" style={{ color: '#F37021' }}>{onlineCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs" style={{ color: '#B0B0B0' }}>status</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#34C759' }} />
            <span className="text-xs" style={{ color: '#34C759' }}>online</span>
          </div>
        </div>
      </div>
    </header>
  );
}
