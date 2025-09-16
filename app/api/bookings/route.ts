// app/api/bookings/route.ts
import { prisma } from "@/lib/prisma"
import { ok, bad } from "@/lib/api"

export async function GET() {
  const data = await prisma.booking.findMany({
    include: { room: { include: { roomType: { include: { property: true } } } } },
    orderBy: { id: "asc" },
  })
  return ok(data)
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => null)
  const hasDates = b?.checkIn && b?.checkOut && !Number.isNaN(Date.parse(b.checkIn)) && !Number.isNaN(Date.parse(b.checkOut))
  if (!b?.guestName || !hasDates || !b?.roomId) {
    return bad("guestName, checkIn, checkOut(ISO), roomId required")
  }
  const created = await prisma.booking.create({
    data: {
      guestName: b.guestName,
      checkIn: new Date(b.checkIn),
      checkOut: new Date(b.checkOut),
      roomId: b.roomId,
    },
  })
  return ok(created)
}