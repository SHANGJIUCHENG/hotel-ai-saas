// app/api/room_types/[id]/route.ts
import { prisma } from "@/lib/prisma"
import { ok, bad, notFound, toId } from "@/lib/api"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = toId(params.id)
  const body = await req.json().catch(() => null) as Partial<{ name: unknown; capacity: unknown; propertyId: unknown }>
  if (!body) return bad('invalid json')
  const data: { name?: string; capacity?: number; propertyId?: number } = {}
  if (body.name !== undefined) {
    if (typeof body.name !== 'string') return bad('invalid name')
    data.name = body.name
  }
  if (body.capacity !== undefined) {
    const capacity = Number(body.capacity)
    if (!Number.isInteger(capacity) || capacity <= 0) return bad('invalid capacity')
    data.capacity = capacity
  }
  if (body.propertyId !== undefined) {
    const propertyId = Number(body.propertyId)
    if (!Number.isInteger(propertyId) || propertyId <= 0) return bad('invalid propertyId')
    data.propertyId = propertyId
  }
  if (!Object.keys(data).length) return bad('no valid fields')
  try {
    const updated = await prisma.roomType.update({ where: { id }, data })
    return ok(updated)
  } catch {
    return notFound("room_type not found")
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const id = toId(params.id)
  try {
    const deleted = await prisma.roomType.delete({ where: { id } })
    return ok(deleted)
  } catch {
    return notFound("room_type not found")
  }
}
