'use client';

import { useState } from 'react';
import { X, Upload, Check, AlertCircle, Loader } from 'lucide-react';

interface UploadPanelProps {
  onClose: () => void;
}

export default function UploadPanel({ onClose }: UploadPanelProps) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    language: 'python',
    code: '',
    tags: '',
    password: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.code || !form.password) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage('Snippet added successfully');
        setTimeout(() => {
          setForm({ title: '', description: '', language: 'python', code: '', tags: '', password: '' });
          setStatus('idle');
          onClose();
          window.location.reload();
        }, 1500);
      } else {
        setStatus('error');
        setMessage(data.error || 'Upload failed');
      }
    } catch {
      setStatus('error');
      setMessage('Network error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] rounded-xl overflow-hidden flex flex-col"
        style={{ backgroundColor: '#121212', border: '1px solid #2A2A2A' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#2A2A2A' }}>
          <div className="flex items-center gap-3">
            <Upload size={16} style={{ color: '#F37021' }} />
            <span className="text-sm font-medium text-white">Add Snippet</span>
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

        {/* Form */}
        <div className="flex-1 overflow-auto px-6 py-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password */}
            <div>
              <label className="block text-xs mb-1.5" style={{ color: '#B0B0B0' }}>Password *</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter upload password"
                className="w-full px-3 py-2 rounded-lg text-sm transition-colors duration-150"
                style={{
                  backgroundColor: '#0A0A0A',
                  border: '1px solid #2A2A2A',
                  color: '#FFFFFF',
                  outline: 'none',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#F37021')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#2A2A2A')}
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs mb-1.5" style={{ color: '#B0B0B0' }}>Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Redis Rate Limiter"
                className="w-full px-3 py-2 rounded-lg text-sm transition-colors duration-150"
                style={{
                  backgroundColor: '#0A0A0A',
                  border: '1px solid #2A2A2A',
                  color: '#FFFFFF',
                  outline: 'none',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#F37021')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#2A2A2A')}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs mb-1.5" style={{ color: '#B0B0B0' }}>Description</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description of what this does"
                className="w-full px-3 py-2 rounded-lg text-sm transition-colors duration-150"
                style={{
                  backgroundColor: '#0A0A0A',
                  border: '1px solid #2A2A2A',
                  color: '#FFFFFF',
                  outline: 'none',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#F37021')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#2A2A2A')}
              />
            </div>

            {/* Language + Tags row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs mb-1.5" style={{ color: '#B0B0B0' }}>Language</label>
                <select
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm transition-colors duration-150"
                  style={{
                    backgroundColor: '#0A0A0A',
                    border: '1px solid #2A2A2A',
                    color: '#FFFFFF',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#F37021')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#2A2A2A')}
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="bash">Bash</option>
                  <option value="go">Go</option>
                  <option value="rust">Rust</option>
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: '#B0B0B0' }}>Tags</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="Redis, Cache, RateLimit"
                  className="w-full px-3 py-2 rounded-lg text-sm transition-colors duration-150"
                  style={{
                    backgroundColor: '#0A0A0A',
                    border: '1px solid #2A2A2A',
                    color: '#FFFFFF',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#F37021')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#2A2A2A')}
                />
              </div>
            </div>

            {/* Code */}
            <div>
              <label className="block text-xs mb-1.5" style={{ color: '#B0B0B0' }}>Code *</label>
              <textarea
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="Paste your code here..."
                rows={8}
                className="w-full px-3 py-2 rounded-lg text-xs font-mono transition-colors duration-150 resize-none"
                style={{
                  backgroundColor: '#0A0A0A',
                  border: '1px solid #2A2A2A',
                  color: '#E0E0E0',
                  outline: 'none',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#F37021')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#2A2A2A')}
              />
            </div>

            {/* Status message */}
            {message && (
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                style={{
                  backgroundColor: status === 'success' ? 'rgba(52,199,89,0.12)' : 'rgba(255,59,48,0.12)',
                  color: status === 'success' ? '#34C759' : '#FF3B30',
                  border: `1px solid ${status === 'success' ? '#34C759' : '#FF3B30'}`,
                }}
              >
                {status === 'error' ? <AlertCircle size={12} /> : <Check size={12} />}
                {message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-150 flex items-center justify-center gap-2"
              style={{
                backgroundColor: status === 'success' ? 'rgba(52,199,89,0.12)' : '#F37021',
                color: status === 'success' ? '#34C759' : '#FFFFFF',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.6 : 1,
              }}
            >
              {status === 'loading' ? (
                <>
                  <Loader size={14} className="animate-spin" />
                  Uploading...
                </>
              ) : status === 'success' ? (
                <>
                  <Check size={14} />
                  Added
                </>
              ) : (
                <>
                  <Upload size={14} />
                  Add Snippet
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
