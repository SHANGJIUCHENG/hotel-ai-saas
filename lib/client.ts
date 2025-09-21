// lib/client.ts
export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { cache: 'no-store', ...init })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export type PageParams = { page?: number; size?: number; search?: string }
export function buildQuery({ page = 1, size = 10, search = '' }: PageParams) {
  const q = new URLSearchParams()
  q.set('page', String(page))
  q.set('size', String(size))
  if (search) q.set('search', search)
  return `?${q.toString()}`
}

export function paginate<T>(items: T[], page = 1, size = 10) {
  const start = (page - 1) * size
  return { rows: items.slice(start, start + size), total: items.length }
}
