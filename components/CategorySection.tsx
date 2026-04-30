'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SnippetCard from './SnippetCard';
import {
  Server, Bot, TrendingUp, Cloud, Terminal, Shield,
  Database, Globe, Cpu, Lock, BarChart3, Link2
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Server: <Server size={16} />,
  Bot: <Bot size={16} />,
  TrendingUp: <TrendingUp size={16} />,
  Cloud: <Cloud size={16} />,
  Terminal: <Terminal size={16} />,
  Shield: <Shield size={16} />,
  Database: <Database size={16} />,
  Globe: <Globe size={16} />,
  Cpu: <Cpu size={16} />,
  Lock: <Lock size={16} />,
  BarChart3: <BarChart3 size={16} />,
  Link2: <Link2 size={16} />,
};

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  snippets: any[];
}

export default function CategorySection({ category }: { category: Category }) {
  const [open, setOpen] = useState(true);
  const accentColor = category.color || '#F37021';

  return (
    <section className="mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-2 border-b transition-colors duration-150"
        style={{ borderColor: '#2A2A2A' }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#3A3A3A')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2A2A2A')}
      >
        <div className="flex items-center gap-3">
          <span style={{ color: accentColor }}>
            {ICON_MAP[category.icon] || <Terminal size={16} />}
          </span>
          <span className="text-sm font-medium text-white">{category.name}</span>
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={{ backgroundColor: 'rgba(243,112,33,0.12)', color: accentColor }}
          >
            {category.snippets.length}
          </span>
        </div>
        <ChevronDown
          size={14}
          className="transition-transform duration-200"
          style={{
            color: '#B0B0B0',
            transform: open ? 'rotate(0deg)' : 'rotate(-90deg)'
          }}
        />
      </button>

      {open && (
        <div className="grid grid-cols-1 gap-3 mt-4">
          {category.snippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} accentColor={accentColor} />
          ))}
        </div>
      )}
    </section>
  );
}
