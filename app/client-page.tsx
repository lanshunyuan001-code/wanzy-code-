'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import StatsBar from '@/components/StatsBar';
import LinkCard from '@/components/LinkCard';
import CategorySection from '@/components/CategorySection';
import UploadFab from '@/components/UploadFab';
import Footer from '@/components/Footer';
import GsapInit from '@/components/GsapInit';

interface SiteData {
  owner: string;
  siteName: string;
  description: string;
  totalSnippets: number;
  totalLinks: number;
  categories: any[];
  links: any[];
  updatedAt: string;
}

interface ClientPageProps {
  initialData: SiteData;
}

export default function ClientPage({ initialData }: ClientPageProps) {
  const [data] = useState<SiteData>(initialData);

  const snippetCount = data.categories.reduce(
    (acc, cat) => acc + cat.snippets.length,
    0
  );

  return (
    <GsapInit>
      <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
        {/* Header */}
        <Header onlineCount={snippetCount} />

        {/* Main */}
        <main className="pt-14">
          {/* Stats Bar */}
          <StatsBar snippetCount={snippetCount} updatedAt="2026-04-30" />

          {/* Links Section */}
          {data.links.length > 0 && (
            <div className="px-4 py-5 border-b" style={{ borderColor: '#2A2A2A' }}>
              <div
                className="text-[10px] tracking-[0.2em] mb-3 font-mono"
                style={{ color: '#B0B0B0' }}
              >
                // LINKS
              </div>
              <div className="grid grid-cols-2 gap-2">
                {data.links.map((link) => (
                  <LinkCard key={link.id} link={link} />
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          <div className="px-4 pt-6">
            {data.categories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Upload FAB */}
        <UploadFab />
      </div>
    </GsapInit>
  );
}
