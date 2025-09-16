// app/api/room_types/route.ts
import { prisma } from "@/lib/prisma"
import { ok, bad } from "@/lib/api"

export async function GET() {
  const data = await prisma.roomType.findMany({
    include: { property: true, rooms: true },
    orderBy: { id: "asc" },
  })
  return ok(data)
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => null)
  if (!b?.name || typeof b.capacity !== "number" || !b?.propertyId) {
    return bad("name, capacity(number), propertyId required")
  }
  const created = await prisma.roomType.create({
    data: { name: b.name, capacity: b.capacity, propertyId: b.propertyId },
  })
  return ok(created)
}