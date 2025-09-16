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
  const b = await req.json().catch(() => null)
  if (!b?.number || !b?.roomTypeId) return bad("number, roomTypeId required")
  const created = await prisma.room.create({
    data: { number: b.number, roomTypeId: b.roomTypeId },
  })
  return ok(created)
}