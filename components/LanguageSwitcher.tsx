'use client'

import { Lang } from '@/lib/i18n'

interface Props {
  lang: Lang
  onChange: (lang: Lang) => void
}

export default function LanguageSwitcher({ lang, onChange }: Props) {
  return (
    <button
      onClick={() => onChange(lang === 'zh' ? 'en' : 'zh')}
      className="text-[10px] px-2 py-1 rounded border transition-colors duration-150"
      style={{
        borderColor: '#27272a',
        color: '#52525b',
        backgroundColor: 'transparent',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.color = '#fafafa'
        ;(e.currentTarget as HTMLElement).style.borderColor = '#3f3f46'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.color = '#52525b'
        ;(e.currentTarget as HTMLElement).style.borderColor = '#27272a'
      }}
    >
      {lang === 'zh' ? 'EN' : '中'}
    </button>
  )
}
