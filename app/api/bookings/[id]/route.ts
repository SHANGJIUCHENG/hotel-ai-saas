// app/api/bookings/[id]/route.ts
import { prisma } from "@/lib/prisma"
import { ok, bad, notFound, toId } from "@/lib/api"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = toId(params.id)
  const b = await req.json().catch(() => null)
  if (!b) return bad("invalid json")
  try {
    const updated = await prisma.booking.update({
      where: { id },
      data: {
        guestName: b.guestName,
        checkIn: b.checkIn ? new Date(b.checkIn) : undefined,
        checkOut: b.checkOut ? new Date(b.checkOut) : undefined,
        roomId: b.roomId,
      },
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