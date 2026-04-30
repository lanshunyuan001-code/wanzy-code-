'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import UploadPanel from './UploadPanel';

export default function UploadFab() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 z-40"
        style={{
          backgroundColor: '#F37021',
          boxShadow: '0 4px 20px rgba(243,112,33,0.35)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(243,112,33,0.45)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(243,112,33,0.35)';
        }}
      >
        <Plus size={20} color="#FFFFFF" strokeWidth={2.5} />
      </button>

      {show && <UploadPanel onClose={() => setShow(false)} />}
    </>
  );
}
