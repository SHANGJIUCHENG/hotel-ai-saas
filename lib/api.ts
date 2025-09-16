// lib/api.ts（可选的小工具，统一响应）
export function ok(data: unknown, init?: ResponseInit) {
  return Response.json(data, { status: 200, ...init })
}
export function bad(msg: string, init?: ResponseInit) {
  return Response.json({ error: msg }, { status: 400, ...init })
}
export function notFound(msg = "Not found") {
  return Response.json({ error: msg }, { status: 404 })
}
export function toId(id: string) {
  const n = Number(id)
  if (!Number.isInteger(n) || n <= 0) throw new Error("Invalid id")
  return n
}