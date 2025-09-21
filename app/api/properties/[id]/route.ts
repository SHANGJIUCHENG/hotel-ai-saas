// app/api/properties/[id]/route.ts
import { prisma } from "@/lib/prisma"
import { ok, bad, notFound, toId } from "@/lib/api"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = toId(params.id)
  const body = await req.json().catch(() => null) as Partial<{ name: unknown; address: unknown }>
  if (!body) return bad('invalid json')
  const data: { name?: string; address?: string } = {}
  if (body.name !== undefined) {
    if (typeof body.name !== 'string') return bad('invalid name')
    data.name = body.name
  }
  if (body.address !== undefined) {
    if (typeof body.address !== 'string') return bad('invalid address')
    data.address = body.address
  }
  if (!Object.keys(data).length) return bad('no valid fields')
  try {
    const updated = await prisma.property.update({ where: { id }, data })
    return ok(updated)
  } catch {
    return notFound("property not found")
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const id = toId(params.id)
  try {
    const deleted = await prisma.property.delete({ where: { id } })
    return ok(deleted)
  } catch {
    return notFound("property not found")
  }
}
