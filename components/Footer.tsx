'use client';

export default function Footer() {
  return (
    <footer
      className="px-4 py-8 text-center border-t"
      style={{ borderColor: '#2A2A2A' }}
    >
      <p
        className="text-[10px] tracking-wider font-mono transition-colors duration-200"
        style={{ color: '#3A3A3A' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#B0B0B0')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#3A3A3A')}
      >
        POWERED BY NEXT.JS · WANZY.CODE
      </p>
    </footer>
  );
}
