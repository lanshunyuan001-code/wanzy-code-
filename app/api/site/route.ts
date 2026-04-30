import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'snippets.json')

export async function GET() {
  try {
    const raw = readFileSync(dataPath, 'utf-8')
    const data = JSON.parse(raw)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 })
  }
}
