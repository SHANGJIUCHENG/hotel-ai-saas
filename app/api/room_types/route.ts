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
  const b = await req.json().catch(() => null) as Partial<{ name: unknown; capacity: unknown; propertyId: unknown }>
  const capacity = Number(b?.capacity)
  const propertyId = Number(b?.propertyId)
  if (
    typeof b?.name !== 'string' ||
    !Number.isInteger(capacity) ||
    capacity <= 0 ||
    !Number.isInteger(propertyId) ||
    propertyId <= 0
  ) {
    return bad('name, capacity(number), propertyId required')
  }
  const created = await prisma.roomType.create({
    data: { name: b.name, capacity, propertyId },
  })
  return ok(created)
}
