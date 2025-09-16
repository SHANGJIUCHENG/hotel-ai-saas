// app/api/properties/[id]/route.ts
import { prisma } from "@/lib/prisma"
import { ok, bad, notFound, toId } from "@/lib/api"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = toId(params.id)
  const data = await req.json().catch(() => null)
  if (!data) return bad("invalid json")
  try {
    const updated = await prisma.property.update({ where: { id }, data })
    return ok(updated)
  } catch {
    return notFound("property not found")
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const id = toId(params.id)
  try {
    const deleted = await prisma.property.delete({ where: { id } })
    return ok(deleted)
  } catch {
    return notFound("property not found")
  }
}