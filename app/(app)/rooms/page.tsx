// export default function RoomsPage() {
//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-semibold">Rooms</h1>
//       <p className="text-neutral-600">房型与库存占位</p>
//       <div className="h-64 skeleton" />
//     </div>
//   )
// }

// app/(app)/rooms/page.tsx
'use client'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogHeader } from '@/components/ui/dialog'
import { RoomForm } from '@/components/rooms/RoomForm'
import { fetchJson, paginate } from '@/lib/client'

type Room = { id: number; number: string; roomType: { id: number; name: string } }

export default function RoomsPage() {
  const [rows, setRows] = React.useState<Room[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [size, setSize] = React.useState(10)

  const filtered = React.useMemo(() => rows.filter(r =>
    (r.number + r.roomType?.name).toLowerCase().includes(search.toLowerCase())
  ), [rows, search])
  const { rows: pageRows, total } = React.useMemo(() => paginate(filtered, page, size), [filtered, page, size])

  async function load() {
    setLoading(true)
    try { setRows(await fetchJson<Room[]>('/api/rooms')) }
    finally { setLoading(false) }
  }
  React.useEffect(() => { void load() }, [])

  const [open, setOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Room | null>(null)

  async function create(data: { number: string; roomTypeId: number }) {
    await fetch('/api/rooms', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) })
    setOpen(false); await load()
  }
  async function update(id: number, data: Partial<{ number: string; roomTypeId: number }>) {
    await fetch(`/api/rooms/${id}`, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) })
    setOpen(false); setEditing(null); await load()
  }
  async function remove(id: number) {
    if (!confirm('确定删除该房间？')) return
    await fetch(`/api/rooms/${id}`, { method: 'DELETE' }); await load()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Rooms</h1>
        <Button onClick={() => { setEditing(null); setOpen(true) }}>新建</Button>
      </div>

      <div className="flex items-center gap-2">
        <Input placeholder="搜索房号/房型" value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        <select className="rounded-2xl border px-3 py-2" value={size} onChange={e => setSize(Number(e.target.value))}>
          {[10,20,50].map(s => <option key={s} value={s}>{s}/页</option>)}
        </select>
      </div>

      <div className="border rounded-2xl overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left">
            <tr><th className="p-3 w-16">ID</th><th className="p-3">房号</th><th className="p-3">房型</th><th className="p-3 w-40">操作</th></tr>
          </thead>
          <tbody>
            {loading ? <tr><td className="p-3" colSpan={4}>加载中…</td></tr> :
            pageRows.length ? pageRows.map(r => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.id}</td><td className="p-3">{r.number}</td><td className="p-3">{r.roomType?.name ?? '-'}</td>
                <td className="p-3 flex gap-2">
                  <Button className="px-3 py-1" onClick={() => { setEditing(r); setOpen(true) }}>编辑</Button>
                  <button className="px-3 py-1 rounded-2xl border" onClick={() => remove(r.id)}>删除</button>
                </td>
              </tr>
            )) : <tr><td className="p-3" colSpan={4}>无数据</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span>共 {total} 条</span>
        <div className="flex items-center gap-2">
          <button disabled={page===1} onClick={() => setPage(p => Math.max(1, p-1))} className="px-3 py-1 rounded-2xl border disabled:opacity-50">上一页</button>
          <span>{page}</span>
          <button disabled={page*size>=total} onClick={() => setPage(p => p+1)} className="px-3 py-1 rounded-2xl border disabled:opacity-50">下一页</button>
        </div>
      </div>

      <Dialog open={open} onClose={() => { setOpen(false); setEditing(null) }}>
        <DialogHeader title={editing ? '编辑房间' : '新建房间'} />
        <RoomForm
          initial={editing ? { number: editing.number, roomTypeId: editing.roomType?.id } : undefined}
          onSubmit={async (v) => editing ? update(editing.id, v) : create(v)}
        />
      </Dialog>
    </div>
  )
}
