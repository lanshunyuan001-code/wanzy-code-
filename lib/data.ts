// Server-only data access — uses fs, safe in server components and API routes only
import { readFileSync } from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'snippets.json')

export interface Snippet {
  id: string
  title: string
  description: string
  language: string
  code: string
  tags: string[]
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
  snippets: Snippet[]
}

export interface Link {
  id: string
  title: string
  description: string
  url: string
  favicon: string
  tags: string[]
  featured: boolean
}

export interface SiteData {
  owner: string
  siteName: string
  description: string
  totalSnippets: number
  totalLinks: number
  updatedAt: string
  categories: Category[]
  links: Link[]
}

export function getSiteData(): SiteData {
  const raw = readFileSync(dataPath, 'utf-8')
  return JSON.parse(raw) as SiteData
}
