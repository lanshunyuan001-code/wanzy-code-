// Server-only data access — uses fs, safe in server components and API routes only
import { readFileSync } from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'snippets.json')

export interface Snippet {
  id: string
  title: string
  description: string
  tags: string[]
  date: string
  note: string
  code: string
}

export interface SiteData {
  owner: string
  siteName: string
  description: string
  updatedAt: string
  snippets: Snippet[]
}

export function getSiteData(): SiteData {
  const raw = readFileSync(dataPath, 'utf-8')
  return JSON.parse(raw) as SiteData
}
