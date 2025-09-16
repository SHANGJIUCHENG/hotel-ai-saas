// prisma/seed.ts
import { prisma } from "../lib/prisma"

async function main() {
  const p = await prisma.property.create({
    data: { name: "Hotel A", address: "Tokyo" },
  })
  const rt = await prisma.roomType.create({
    data: { name: "Standard", capacity: 2, propertyId: p.id },
  })
  const r = await prisma.room.create({
    data: { number: "101", roomTypeId: rt.id },
  })
  await prisma.booking.create({
    data: {
      guestName: "Taro Yamada",
      checkIn: new Date("2025-09-01"),
      checkOut: new Date("2025-09-03"),
      roomId: r.id,
    },
  })
  console.log("Seed completed")
}
main().finally(() => prisma.$disconnect())