'use client'

import { useState } from 'react'
import { SiteData } from '@/lib/data'
import CodeModal from '@/components/CodeModal'

interface ClientPageProps {
  initialData: SiteData
}

export default function ClientPage({ initialData }: ClientPageProps) {
  const [data] = useState<SiteData>(initialData)
  const [showAll, setShowAll] = useState(false)
  const [activeSnippet, setActiveSnippet] = useState<string | null>(null)

  const displayed = showAll ? data.snippets : data.snippets.slice(0, 3)
  const active = data.snippets.find(s => s.id === activeSnippet)

  return (
    <div
        className="min-h-screen"
        style={{
          backgroundColor: '#0A0A0A',
          fontFamily: 'JetBrains Mono, SF Mono, monospace',
        }}
      >
        {/* Hero Header */}
        <div
          className="px-4 pt-8 pb-6 border-b"
          style={{ borderColor: '#2A2A2A' }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F37021"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" x2="20" y1="19" y2="19" />
              </svg>
              <span
                className="text-[10px] tracking-[0.3em]"
                style={{ color: '#5A5A5A' }}
              >
                CODE_VAULT.v1
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold leading-tight" style={{ color: '#FFFFFF' }}>
            {data.owner}
            <br />
            <span style={{ color: '#F37021' }}>{data.siteName}</span>
          </h1>
        </div>

        {/* Stats Bar */}
        <div
          className="px-4 py-3 flex items-center justify-between text-[10px] tracking-wider border-b"
          style={{ borderColor: '#2A2A2A', color: '#5A5A5A' }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: '#34C759' }}
            />
            <span>ONLINE</span>
          </div>
          <span>
            {data.snippets.length} SNIPPETS
          </span>
          <span>UPDATED {data.updatedAt}</span>
        </div>

        {/* Main Content */}
        <div className="px-4 py-6">
          {/* Section Label */}
          <div
            className="text-[10px] tracking-[0.2em] mb-4"
            style={{ color: '#5A5A5A' }}
          >
            // CODE_VAULT
          </div>

          {/* Category Header */}
          <div
            className="flex items-center justify-between mb-3 pb-3 border-b"
            style={{ borderColor: '#2A2A2A' }}
          >
            <div className="flex items-center gap-2">
              {/* Radar icon with Hermès orange */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F37021"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
                <path d="M4 6h.01" />
                <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
                <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
                <path d="M12 18h.01" />
                <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" />
                <circle cx="12" cy="12" r="2" />
                <path d="m13.41 10.59 5.66-5.66" />
              </svg>
              <span className="text-base font-bold" style={{ color: '#FFFFFF' }}>
                {data.description}
              </span>
              <span
                className="text-[10px] tracking-wider"
                style={{ color: '#3A3A3A' }}
              >
                {data.snippets.length} snippets
              </span>
            </div>
          </div>

          {/* Snippet List */}
          <div className="space-y-2">
            {displayed.map((snippet, idx) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                index={idx + 1}
                onClick={() => setActiveSnippet(snippet.id)}
              />
            ))}
          </div>

          {/* Show More */}
          {data.snippets.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full mt-2 py-2.5 text-xs flex items-center justify-center gap-1.5 border rounded transition-colors duration-150"
              style={{
                color: '#3A3A3A',
                borderColor: '#2A2A2A',
                borderStyle: 'dashed',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.color = '#B0B0B0'
                ;(e.currentTarget as HTMLElement).style.borderColor = '#3A3A3A'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.color = '#3A3A3A'
                ;(e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A'
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
              <span>{showAll ? 'show less' : 'show more'}</span>
            </button>
          )}
        </div>

        {/* Footer */}
        <footer
          className="px-4 py-8 text-center border-t"
          style={{ borderColor: '#2A2A2A' }}
        >
          <p
            className="text-[10px] tracking-wider font-mono"
            style={{ color: '#3A3A3A' }}
          >
            POWERED BY NEXT.JS · {data.owner.toUpperCase()}
          </p>
        </footer>

        {/* Code Modal */}
        {active && (
          <CodeModal
            snippet={active}
            onClose={() => setActiveSnippet(null)}
          />
        )}
      </div>
  )
}

// ─── Snippet Card ───────────────────────────────────────────────────────────

interface SnippetCardProps {
  snippet: {
    id: string
    title: string
    description: string
    tags: string[]
    date: string
    note: string
  }
  index: number
  onClick: () => void
}

function SnippetCard({ snippet, index, onClick }: SnippetCardProps) {
  const num = String(index).padStart(2, '0')

  return (
    <article
      onClick={onClick}
      className="cursor-pointer p-4 rounded-md border transition-all duration-150 active:scale-[0.99]"
      style={{
        backgroundColor: 'rgba(18,18,18,0.5)',
        borderColor: '#2A2A2A',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(18,18,18,0.8)'
        ;(e.currentTarget as HTMLElement).style.borderColor = '#3A3A3A'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(18,18,18,0.5)'
        ;(e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A'
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        {/* Meta: #01 + date */}
        <div className="flex items-center gap-3">
          <span
            className="text-[10px]"
            style={{ color: '#F37021' }}
          >
            #{num}
          </span>
          <span
            className="text-[10px]"
            style={{ color: '#3A3A3A' }}
          >
            {snippet.date}
          </span>
        </div>

        {/* Chevron */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3A3A3A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 mt-0.5"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>

      {/* Title */}
      <h3
        className="font-bold text-base mb-1 leading-snug"
        style={{ color: '#FFFFFF' }}
      >
        {snippet.title}
      </h3>

      {/* Description */}
      <p
        className="text-xs mb-3"
        style={{ color: '#3A3A3A' }}
      >
        {snippet.description}
      </p>

      {/* Footer: tags + actions */}
      <div className="flex items-center justify-between">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {snippet.tags.map(tag => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 rounded-sm border"
              style={{
                borderColor: '#2A2A2A',
                color: '#3A3A3A',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 rounded transition-colors duration-150 flex items-center gap-1"
            style={{ color: '#3A3A3A' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F37021')}
            onMouseLeave={e => (e.currentTarget.style.color = '#3A3A3A')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
          <button
            className="p-1.5 rounded transition-colors duration-150"
            style={{ color: '#3A3A3A' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F37021')}
            onMouseLeave={e => (e.currentTarget.style.color = '#3A3A3A')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}
