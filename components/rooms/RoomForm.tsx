'use client'

// components/rooms/RoomForm.tsx
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoomSchema, type RoomInput } from '@/lib/schemas'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { fetchJson } from '@/lib/client'

type RoomType = { id: number; name: string }

export function RoomForm({ initial, onSubmit, submitting }: {
  initial?: Partial<RoomInput>
  onSubmit: (data: RoomInput) => Promise<void>
  submitting?: boolean
}) {
  const { register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm<RoomInput>({
    resolver: zodResolver(RoomSchema),
    defaultValues: { number: initial?.number ?? '', roomTypeId: Number(initial?.roomTypeId) || 0 },
  })

  const [types, setTypes] = React.useState<RoomType[]>([])
  React.useEffect(() => {
    fetchJson<RoomType[]>('/api/room_types').then(setTypes).catch(() => setTypes([]))
  }, [])

  return (
    <form className="space-y-4" onSubmit={handleSubmit(async (v) => { v.roomTypeId = Number(v.roomTypeId); await onSubmit(v); reset(v) })}>
      <div>
        <label className="text-sm">房号</label>
        <Input {...register('number')} />
        {errors.number && <p className="text-sm text-red-600 mt-1">{errors.number.message}</p>}
      </div>
      <div>
        <label className="text-sm">房型</label>
        <Select value={String(watch('roomTypeId'))} onChange={(e) => setValue('roomTypeId', Number(e.target.value))}>
          <option value={0}>请选择房型</option>
          {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </Select>
        {errors.roomTypeId && <p className="text-sm text-red-600 mt-1">{errors.roomTypeId.message}</p>}
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={submitting}>{submitting ? '提交中…' : '保存'}</Button>
      </div>
    </form>
  )
}
