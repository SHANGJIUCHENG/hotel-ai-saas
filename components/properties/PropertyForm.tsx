'use client'

// components/properties/PropertyForm.tsx
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PropertySchema, type PropertyInput } from '@/lib/schemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function PropertyForm({
  initial, onSubmit, submitting
}: {
  initial?: Partial<PropertyInput>
  onSubmit: (data: PropertyInput) => Promise<void>
  submitting?: boolean
}) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PropertyInput>({
    resolver: zodResolver(PropertySchema),
    defaultValues: { name: initial?.name ?? '', address: initial?.address ?? '' },
  })

  return (
    <form className="space-y-4" onSubmit={handleSubmit(async (v) => { await onSubmit(v); reset(v) })}>
      <div>
        <label className="text-sm">名称</label>
        <Input {...register('name')} />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="text-sm">地址</label>
        <Input {...register('address')} />
        {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>}
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={submitting}>{submitting ? '提交中…' : '保存'}</Button>
      </div>
    </form>
  )
}
