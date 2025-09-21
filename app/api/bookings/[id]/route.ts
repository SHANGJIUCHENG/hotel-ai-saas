// app/api/bookings/[id]/route.ts
import { prisma } from "@/lib/prisma"
import { ok, bad, notFound, toId } from "@/lib/api"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = toId(params.id)
  const body = await req.json().catch(() => null) as Partial<{ guestName: unknown; checkIn: unknown; checkOut: unknown; roomId: unknown }>
  if (!body) return bad('invalid json')
  const data: { guestName?: string; checkIn?: Date; checkOut?: Date; roomId?: number } = {}
  if (body.guestName !== undefined) {
    if (typeof body.guestName !== 'string') return bad('invalid guestName')
    data.guestName = body.guestName
  }
  if (body.checkIn !== undefined) {
    if (typeof body.checkIn !== 'string') return bad('invalid checkIn')
    const checkIn = new Date(body.checkIn)
    if (Number.isNaN(checkIn.getTime())) return bad('invalid checkIn')
    data.checkIn = checkIn
  }
  if (body.checkOut !== undefined) {
    if (typeof body.checkOut !== 'string') return bad('invalid checkOut')
    const checkOut = new Date(body.checkOut)
    if (Number.isNaN(checkOut.getTime())) return bad('invalid checkOut')
    data.checkOut = checkOut
  }
  if (body.roomId !== undefined) {
    const roomId = Number(body.roomId)
    if (!Number.isInteger(roomId) || roomId <= 0) return bad('invalid roomId')
    data.roomId = roomId
  }
  if (!Object.keys(data).length) return bad('no valid fields')
  try {
    const updated = await prisma.booking.update({
      where: { id },
      data,
    })
    return ok(updated)
  } catch {
    return notFound("booking not found")
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const id = toId(params.id)
  try {
    const deleted = await prisma.booking.delete({ where: { id } })
    return ok(deleted)
  } catch {
    return notFound("booking not found")
  }
}
