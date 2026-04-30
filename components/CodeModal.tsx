'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Copy, Check, Download, Calendar, Tag } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';

interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  tags: string[];
  updatedAt: string;
}

export default function CodeModal({ snippet, onClose }: { snippet: Snippet; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = snippet.language === 'python' ? 'py' : snippet.language === 'bash' ? 'sh' : snippet.language === 'javascript' ? 'js' : 'txt';
    const blob = new Blob([snippet.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${snippet.id}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[85vh] rounded-xl overflow-hidden flex flex-col"
        style={{ backgroundColor: '#121212', border: '1px solid #2A2A2A' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#2A2A2A' }}>
          <div>
            <h2 className="text-sm font-medium text-white mb-1">{snippet.title}</h2>
            <div className="flex items-center gap-4" style={{ color: '#B0B0B0' }}>
              <div className="flex items-center gap-1">
                <Calendar size={10} />
                <span className="text-xs">{snippet.updatedAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag size={10} />
                <span className="text-xs">{snippet.language}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors duration-150"
            style={{ color: '#B0B0B0' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1A1A1A';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#B0B0B0';
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Description */}
        <div className="px-6 pt-4 pb-0">
          <p className="text-xs" style={{ color: '#B0B0B0' }}>{snippet.description}</p>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-0">
          {snippet.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded"
              style={{ backgroundColor: 'rgba(243,112,33,0.12)', color: '#F37021' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Code */}
        <div className="flex-1 overflow-auto px-6 py-4">
          <div
            className="relative rounded-lg overflow-hidden"
            style={{ backgroundColor: '#0A0A0A', border: '1px solid #2A2A2A' }}
          >
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #F37021, transparent)', opacity: 0.4 }} />
            <pre className="p-5 text-xs leading-relaxed overflow-x-auto">
              <code dangerouslySetInnerHTML={{ __html: highlighted() }} />
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: '#2A2A2A' }}>
          <span className="text-xs" style={{ color: '#B0B0B0' }}>
            {snippet.code.split('\n').length} lines · {snippet.language}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-150"
              style={{
                backgroundColor: copied ? 'rgba(52,199,89,0.12)' : 'rgba(243,112,33,0.12)',
                color: copied ? '#34C759' : '#F37021',
                border: `1px solid ${copied ? '#34C759' : 'rgba(243,112,33,0.3)'}`,
              }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-150"
              style={{
                backgroundColor: 'transparent',
                color: '#B0B0B0',
                border: '1px solid #2A2A2A',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3A3A3A';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2A2A2A';
                e.currentTarget.style.color = '#B0B0B0';
              }}
            >
              <Download size={12} />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
