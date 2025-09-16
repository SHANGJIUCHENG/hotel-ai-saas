// lib/schemas.ts
import { z } from 'zod'

export const PropertySchema = z.object({
  name: z.string().min(1, '必填'),
  address: z.string().min(1, '必填'),
})
export type PropertyInput = z.infer<typeof PropertySchema>

export const RoomSchema = z.object({
  number: z.string().min(1, '必填'),
  roomTypeId: z.number().int().positive('请选择房型'),
})
export type RoomInput = z.infer<typeof RoomSchema>