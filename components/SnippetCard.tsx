'use client';

import { useState } from 'react';
import { Calendar, Copy, Check, Terminal } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import CodeModal from './CodeModal';

interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  tags: string[];
  updatedAt: string;
}

export default function SnippetCard({ snippet, accentColor = '#F37021' }: { snippet: Snippet; accentColor?: string }) {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlighted = () => {
    try {
      const lang = snippet.language === 'shell' ? 'bash' : snippet.language;
      return Prism.highlight(snippet.code, Prism.languages[lang] || Prism.languages.plain, lang);
    } catch {
      return snippet.code;
    }
  };

  return (
    <>
      <article
        onClick={() => setShowModal(true)}
        className="group relative rounded-lg p-4 cursor-pointer transition-all duration-200"
        style={{
          backgroundColor: '#121212',
          border: '1px solid #2A2A2A',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = accentColor;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px rgba(243,112,33,0.08)`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}
      >
        {/* Glow line on top */}
        <div
          className="absolute top-0 left-4 right-4 h-px transition-opacity duration-200 opacity-0 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
        />

        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Terminal size={12} style={{ color: accentColor }} />
            <h3 className="text-sm font-medium text-white group-hover:opacity-80 transition-opacity">
              {snippet.title}
            </h3>
          </div>
          <button
            onClick={handleCopy}
            className="p-1 rounded transition-colors duration-150"
            style={{ color: '#B0B0B0' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#B0B0B0')}
          >
            {copied ? <Check size={12} style={{ color: '#34C759' }} /> : <Copy size={12} />}
          </button>
        </div>

        <p className="text-xs mb-3 line-clamp-2" style={{ color: '#B0B0B0' }}>
          {snippet.description}
        </p>

        {/* Code preview */}
        <div
          className="rounded p-3 text-xs overflow-hidden"
          style={{ backgroundColor: '#0A0A0A', maxHeight: '80px' }}
        >
          <pre
            className="overflow-hidden"
            dangerouslySetInnerHTML={{ __html: highlighted().split('\n').slice(0, 4).join('\n') + (highlighted().split('\n').length > 4 ? '\n...' : '') }}
          />
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span
              className="text-xs px-2 py-0.5 rounded font-medium"
              style={{ backgroundColor: 'rgba(243,112,33,0.12)', color: accentColor }}
            >
              {snippet.language}
            </span>
          </div>
          <div className="flex items-center gap-1" style={{ color: '#B0B0B0' }}>
            <Calendar size={10} />
            <span className="text-xs">{snippet.updatedAt}</span>
          </div>
        </div>
      </article>

      {showModal && (
        <CodeModal snippet={snippet} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
