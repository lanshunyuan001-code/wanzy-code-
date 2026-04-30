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
    const ext = 'py'
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
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-3xl max-h-[85vh] rounded-xl overflow-hidden flex flex-col"
        style={{
          backgroundColor: '#0A0A0A',
          border: '1px solid #2A2A2A',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: '#2A2A2A' }}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-sm border"
              style={{ borderColor: '#2A2A2A', color: '#3A3A3A' }}
            >
              {snippet.tags[0]}
            </span>
            <span className="text-sm font-bold" style={{ color: '#FFFFFF' }}>
              {snippet.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors duration-150"
            style={{ color: '#3A3A3A' }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.backgroundColor = '#1A1A1A'
              ;(e.currentTarget as HTMLElement).style.color = '#FFFFFF'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
              ;(e.currentTarget as HTMLElement).style.color = '#3A3A3A'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Bar */}
        <div
          className="flex items-center gap-0 px-6 border-b"
          style={{ borderColor: '#2A2A2A' }}
        >
          <button
            onClick={() => setActiveTab('code')}
            className="py-2.5 px-4 text-xs font-medium border-b-2 transition-colors duration-150"
            style={{
              color: activeTab === 'code' ? '#F37021' : '#3A3A3A',
              borderColor: activeTab === 'code' ? '#F37021' : 'transparent',
            }}
          >
            CODE
          </button>
          <button
            onClick={() => setActiveTab('note')}
            className="py-2.5 px-4 text-xs font-medium border-b-2 transition-colors duration-150"
            style={{
              color: activeTab === 'note' ? '#F37021' : '#3A3A3A',
              borderColor: activeTab === 'note' ? '#F37021' : 'transparent',
            }}
          >
            NOTE
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-6 py-4">
          {activeTab === 'code' ? (
            <div
              className="rounded-lg overflow-hidden"
              style={{
                backgroundColor: '#0A0A0A',
                border: '1px solid #2A2A2A',
              }}
            >
              <pre className="p-5 text-xs leading-relaxed overflow-x-auto">
                <code
                  dangerouslySetInnerHTML={{ __html: highlighted() }}
                  style={{ color: '#E0E0E0' }}
                />
              </pre>
            </div>
          ) : (
            <div
              className="rounded-lg p-5 text-xs leading-relaxed"
              style={{
                backgroundColor: '#121212',
                border: '1px solid #2A2A2A',
                color: '#B0B0B0',
                whiteSpace: 'pre-wrap',
              }}
            >
              {snippet.note}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-6 py-4 border-t"
          style={{ borderColor: '#2A2A2A' }}
        >
          <span
            className="text-xs"
            style={{ color: '#3A3A3A' }}
          >
            {snippet.code.split('\n').length} lines · {snippet.date}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-150"
              style={{
                backgroundColor: copied
                  ? 'rgba(52,199,89,0.12)'
                  : 'rgba(243,112,33,0.12)',
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
                color: '#3A3A3A',
                border: '1px solid #2A2A2A',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = '#3A3A3A'
                ;(e.currentTarget as HTMLElement).style.color = '#FFFFFF'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A'
                ;(e.currentTarget as HTMLElement).style.color = '#3A3A3A'
              }}
            >
              <Download size={12} />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
