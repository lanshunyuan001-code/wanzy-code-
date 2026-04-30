'use client';

import { ExternalLink } from 'lucide-react';

interface Link {
  id: string;
  title: string;
  description: string;
  url: string;
  favicon: string;
  tags: string[];
  featured: boolean;
}

export default function LinkCard({ link }: { link: Link }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg p-4 transition-all duration-200"
      style={{
        backgroundColor: '#121212',
        border: '1px solid #2A2A2A',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#F37021';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(243,112,33,0.08)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={link.favicon}
            alt=""
            className="w-5 h-5 rounded-sm"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div>
            <h3 className="text-sm font-medium text-white group-hover:opacity-80 transition-opacity mb-0.5">
              {link.title}
            </h3>
            <p className="text-xs" style={{ color: '#B0B0B0' }}>{link.description}</p>
          </div>
        </div>
        <ExternalLink
          size={14}
          className="mt-0.5 shrink-0 transition-opacity duration-150"
          style={{ color: '#B0B0B0' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#F37021')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#B0B0B0')}
        />
      </div>

      {link.tags.length > 0 && (
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {link.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded"
              style={{ backgroundColor: 'rgba(243,112,33,0.08)', color: '#F37021' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
