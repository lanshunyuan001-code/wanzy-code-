'use client'

import { useEffect, useState } from 'react'
import { X, Copy, Check, Download } from 'lucide-react'
import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'

interface Snippet {
  id: string
  title: string
  description: string
  tags: string[]
  date: string
  note: string
  code: string
}

export default function CodeModal({
  snippet,
  onClose,
}: {
  snippet: Snippet
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'code' | 'note'>('code')

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const ext = snippet.tags[0]?.toLowerCase().includes('python') ? 'py' : 'txt'
    const blob = new Blob([snippet.code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${snippet.id}.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const highlighted = () => {
    try {
      return Prism.highlight(
        snippet.code,
        Prism.languages.python || Prism.languages.plain,
        'python'
      )
    } catch {
      return snippet.code
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(9,9,11,0.90)', backdropFilter: 'blur(8px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-3xl max-h-[88vh] rounded-md overflow-hidden flex flex-col"
        style={{
          backgroundColor: '#09090b',
          border: '1px solid #18181b',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: '#18181b' }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-sm border"
              style={{ borderColor: '#18181b', color: '#34C759' }}
            >
              {snippet.tags[0]}
            </span>
            <span className="text-sm font-bold" style={{ color: '#fafafa' }}>
              {snippet.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded transition-colors duration-150"
            style={{ color: '#3f3f46' }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.color = '#fafafa'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.color = '#3f3f46'
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Tab Bar: CODE + NOTE both always visible */}
        <div
          className="flex items-center gap-0 px-4 border-b"
          style={{ borderColor: '#18181b' }}
        >
          <button
            onClick={() => setActiveTab('code')}
            className="py-2.5 px-4 text-[11px] font-medium border-b-2 transition-colors duration-150"
            style={{
              color: activeTab === 'code' ? '#34C759' : '#3f3f46',
              borderColor: activeTab === 'code' ? '#34C759' : 'transparent',
            }}
          >
            CODE
          </button>
          {snippet.note && (
            <button
              onClick={() => setActiveTab('note')}
              className="py-2.5 px-4 text-[11px] font-medium border-b-2 transition-colors duration-150"
              style={{
                color: activeTab === 'note' ? '#34C759' : '#3f3f46',
                borderColor: activeTab === 'note' ? '#34C759' : 'transparent',
              }}
            >
              NOTE
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'code' ? (
            <div
              className="p-4 overflow-x-auto"
              style={{
                backgroundColor: '#09090b',
              }}
            >
              <pre className="text-xs leading-[1.7]">
                <code
                  dangerouslySetInnerHTML={{ __html: highlighted() }}
                  style={{ color: '#e0e0e0' }}
                />
              </pre>
            </div>
          ) : (
            <div
              className="p-4 text-xs leading-[1.7]"
              style={{
                backgroundColor: '#09090b',
                color: '#71717a',
                whiteSpace: 'pre-wrap',
              }}
            >
              {snippet.note}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-4 py-3 border-t"
          style={{ borderColor: '#18181b' }}
        >
          <span className="text-[10px]" style={{ color: '#3f3f46' }}>
            {snippet.code.split('\n').length} lines · {snippet.date}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-medium transition-all duration-150"
              style={{
                backgroundColor: copied
                  ? 'rgba(52,199,89,0.12)'
                  : 'rgba(52,199,89,0.08)',
                color: copied ? '#34C759' : '#71717a',
                border: `1px solid ${copied ? 'rgba(52,199,89,0.3)' : '#18181b'}`,
              }}
              onMouseEnter={e => {
                if (!copied) {
                  ;(e.currentTarget as HTMLElement).style.color = '#34C759'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(52,199,89,0.3)'
                }
              }}
              onMouseLeave={e => {
                if (!copied) {
                  ;(e.currentTarget as HTMLElement).style.color = '#71717a'
                  ;(e.currentTarget as HTMLElement).style.borderColor = '#18181b'
                }
              }}
            >
              {copied ? <Check size={10} /> : <Copy size={10} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-medium transition-colors duration-150"
              style={{
                backgroundColor: 'transparent',
                color: '#3f3f46',
                border: '1px solid #18181b',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.color = '#fafafa'
                ;(e.currentTarget as HTMLElement).style.borderColor = '#27272a'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.color = '#3f3f46'
                ;(e.currentTarget as HTMLElement).style.borderColor = '#18181b'
              }}
            >
              <Download size={10} />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
