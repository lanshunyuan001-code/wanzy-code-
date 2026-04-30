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
        backgroundColor: '#09090b',
        fontFamily: 'JetBrains Mono, SF Mono, monospace',
      }}
    >
      {/* ── Hero Header ───────────────────────────────────────── */}
      <div
        className="px-4 pt-8 pb-6 border-b"
        style={{ borderColor: '#18181b' }}
      >
        {/* Top bar: badge + language */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#34C759"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" x2="20" y1="19" y2="19" />
            </svg>
            <span className="text-[10px] tracking-[0.3em]" style={{ color: '#52525b' }}>
              CODE_VAULT.v1
            </span>
          </div>
        </div>

        {/* H1: owner name + Code Vault */}
        <h1
          className="text-3xl font-bold leading-tight"
          style={{ color: '#fafafa' }}
        >
          丸子
          <br />
          <span style={{ color: '#34C759' }}>Code Vault</span>
        </h1>
      </div>

      {/* ── Stats Bar ─────────────────────────────────────────── */}
      <div
        className="px-4 py-3 flex items-center justify-between text-[10px] tracking-wider border-b"
        style={{ borderColor: '#18181b', color: '#52525b' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: '#34C759' }}
          />
          <span>ONLINE</span>
        </div>
        <span>{data.snippets.length} SNIPPETS</span>
        <span>UPDATED {data.updatedAt}</span>
      </div>

      {/* ── Main Content ──────────────────────────────────────── */}
      <div className="px-4 py-6">

        {/* Section label */}
        <div className="text-[10px] tracking-[0.2em] mb-4" style={{ color: '#52525b' }}>
          // CODE_VAULT
        </div>

        {/* Category header */}
        <div
          className="flex items-center justify-between mb-3 pb-3 border-b"
          style={{ borderColor: '#18181b' }}
        >
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#34C759"
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
            <span className="text-base font-bold" style={{ color: '#fafafa' }}>
              {data.description}
            </span>
            <span className="text-[10px] tracking-wider" style={{ color: '#27272a' }}>
              {data.snippets.length} snippets
            </span>
          </div>
        </div>

        {/* Snippet list */}
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

        {/* Show more / show less */}
        {data.snippets.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-2 py-2.5 text-xs flex items-center justify-center gap-1.5 border rounded transition-colors duration-150"
            style={{
              color: '#3f3f46',
              borderColor: '#27272a',
              borderStyle: 'dashed',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.color = '#71717a'
              ;(e.currentTarget as HTMLElement).style.borderColor = '#3f3f46'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.color = '#3f3f46'
              ;(e.currentTarget as HTMLElement).style.borderColor = '#27272a'
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

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer>
        {/* "more categories coming" placeholder */}
        <div className="px-4 py-8 text-center">
          <span className="text-[10px] tracking-wider" style={{ color: '#3f3f46' }}>
            more categories coming
          </span>
        </div>

        {/* BUILT BY line */}
        <div
          className="px-4 py-4 text-center text-[10px] tracking-wider border-t"
          style={{ borderColor: '#18181b', color: '#52525b' }}
        >
          &gt; BUILT BY 丸子 · 2026
        </div>

        {/* Domain button */}
        <div className="px-4 pb-8 flex justify-center">
          <a
            href="https://wanzy777.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] px-4 py-2 rounded-md border tracking-wider transition-colors duration-150"
            style={{
              color: '#71717a',
              borderColor: '#27272a',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.color = '#fafafa'
              ;(e.currentTarget as HTMLElement).style.borderColor = '#3f3f46'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.color = '#71717a'
              ;(e.currentTarget as HTMLElement).style.borderColor = '#27272a'
            }}
          >
            wanzy777.com
          </a>
        </div>
      </footer>

      {/* ── Code Modal ────────────────────────────────────────── */}
      {active && (
        <CodeModal
          snippet={active}
          onClose={() => setActiveSnippet(null)}
        />
      )}
    </div>
  )
}

// ─── Snippet Card ─────────────────────────────────────────────────────────

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
        backgroundColor: 'rgba(24,24,27,0.5)',
        borderColor: '#18181b',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(24,24,27,0.8)'
        ;(e.currentTarget as HTMLElement).style.borderColor = '#27272a'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(24,24,27,0.5)'
        ;(e.currentTarget as HTMLElement).style.borderColor = '#18181b'
      }}
    >
      {/* Row: #01 + date + chevron */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <span className="text-[10px]" style={{ color: '#34C759' }}>
            #{num}
          </span>
          <span className="text-[10px]" style={{ color: '#27272a' }}>
            {snippet.date}
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#27272a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 mt-0.5"
          style={{ transition: 'stroke 0.15s' }}
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>

      {/* Title */}
      <h3 className="font-bold text-base mb-1 leading-snug" style={{ color: '#fafafa' }}>
        {snippet.title}
      </h3>

      {/* Description */}
      <p className="text-xs mb-3" style={{ color: '#52525b' }}>
        {snippet.description}
      </p>

      {/* Footer: tags + actions */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {snippet.tags.map(tag => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 rounded-sm border"
              style={{
                borderColor: '#18181b',
                color: '#52525b',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Heart + Share */}
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 rounded transition-colors duration-150 flex items-center gap-1"
            style={{ color: '#27272a' }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.color = '#34C759'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.color = '#27272a'
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
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
          <button
            className="p-1.5 rounded transition-colors duration-150"
            style={{ color: '#27272a' }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.color = '#34C759'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.color = '#27272a'
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
