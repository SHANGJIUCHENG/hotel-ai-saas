// app/api/rooms/[id]/route.ts
import { prisma } from "@/lib/prisma"
import { ok, bad, notFound, toId } from "@/lib/api"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = toId(params.id)
  const body = await req.json().catch(() => null) as Partial<{ number: unknown; roomTypeId: unknown }>
  if (!body) return bad('invalid json')
  const data: { number?: string; roomTypeId?: number } = {}
  if (body.number !== undefined) {
    if (typeof body.number !== 'string') return bad('invalid number')
    data.number = body.number
  }
  if (body.roomTypeId !== undefined) {
    const roomTypeId = Number(body.roomTypeId)
    if (!Number.isInteger(roomTypeId) || roomTypeId <= 0) return bad('invalid roomTypeId')
    data.roomTypeId = roomTypeId
  }
  if (!Object.keys(data).length) return bad('no valid fields')
  try {
    const updated = await prisma.room.update({ where: { id }, data })
    return ok(updated)
  } catch {
    return notFound("room not found")
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const id = toId(params.id)
  try {
    const deleted = await prisma.room.delete({ where: { id } })
    return ok(deleted)
  } catch {
    return notFound("room not found")
  }
}
