import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

const UPLOAD_PASSWORD = 'wanzy2026'
const dataPath = path.join(process.cwd(), 'data', 'snippets.json')

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate
    if (!body.categoryId || !body.title?.en || !body.code) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Read existing data
    const raw = readFileSync(dataPath, 'utf-8')
    const data = JSON.parse(raw)

    // Generate ID
    const id = `s${Date.now()}`

    // Add snippet
    const newSnippet = {
      id,
      categoryId: body.categoryId,
      title: body.title,
      subtitle: body.subtitle || { en: '', zh: '' },
      tags: body.tags || [],
      date: body.date || new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      language: body.language || 'python',
      code: body.code,
    }

    data.snippets.push(newSnippet)
    data.updatedAt = new Date().toISOString().slice(0, 10).replace(/-/g, '.')

    // Write back
    writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8')

    return NextResponse.json({ success: true, id })
  } catch (err) {
    console.error('[Upload API]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
