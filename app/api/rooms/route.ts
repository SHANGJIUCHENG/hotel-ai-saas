// app/api/rooms/route.ts
import { prisma } from "@/lib/prisma"
import { ok, bad } from "@/lib/api"

export async function GET() {
  const data = await prisma.room.findMany({
    include: { roomType: { include: { property: true } }, bookings: true },
    orderBy: { id: "asc" },
  })
  return ok(data)
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => null) as Partial<{ number: unknown; roomTypeId: unknown }>
  const roomTypeId = Number(b?.roomTypeId)
  if (typeof b?.number !== 'string' || !Number.isInteger(roomTypeId) || roomTypeId <= 0) {
    return bad('number, roomTypeId required')
  }
  const created = await prisma.room.create({
    data: { number: b.number, roomTypeId },
  })
  return ok(created)
}
