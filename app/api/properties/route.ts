// app/api/properties/route.ts
import { prisma } from "@/lib/prisma"
import { ok, bad } from "@/lib/api"

export async function GET() {
  const data = await prisma.property.findMany({
    include: { roomTypes: true },
    orderBy: { id: "asc" },
  })
  return ok(data)
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as Partial<{ name: unknown; address: unknown }>
  if (typeof body?.name !== 'string' || typeof body?.address !== 'string') {
    return bad('name, address required')
  }
  const created = await prisma.property.create({ data: { name: body.name, address: body.address } })
  return ok(created)
}
