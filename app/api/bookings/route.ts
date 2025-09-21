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
  const b = await req.json().catch(() => null) as Partial<{ guestName: unknown; checkIn: unknown; checkOut: unknown; roomId: unknown }>
  const checkIn = typeof b?.checkIn === 'string' ? new Date(b.checkIn) : null
  const checkOut = typeof b?.checkOut === 'string' ? new Date(b.checkOut) : null
  const roomId = Number(b?.roomId)
  if (
    typeof b?.guestName !== 'string' ||
    !checkIn || Number.isNaN(checkIn.getTime()) ||
    !checkOut || Number.isNaN(checkOut.getTime()) ||
    !Number.isInteger(roomId) || roomId <= 0
  ) {
    return bad('guestName, checkIn, checkOut(ISO), roomId required')
  }
  const created = await prisma.booking.create({
    data: {
      guestName: b.guestName,
      checkIn,
      checkOut,
      roomId,
    },
  })
  return ok(created)
}
