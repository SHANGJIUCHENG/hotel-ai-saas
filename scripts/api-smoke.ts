import { GET as getProperties, POST as createProperty } from '@/app/api/properties/route'
import { GET as getRooms, POST as createRoom } from '@/app/api/rooms/route'

async function logResponse(label: string, run: () => Promise<Response>) {
  try {
    const res = await run()
    const body = await res.clone().text()
    console.log(`${label}:`, res.status, body)
  } catch (error) {
    console.error(`${label} failed:`, (error as Error).message)
  }
}

async function main() {
  await logResponse('GET /api/properties', () => getProperties())
  await logResponse('GET /api/rooms', () => getRooms())
  await logResponse('POST /api/properties', () => createProperty(new Request('http://localhost/api/properties', {
    method: 'POST',
    body: JSON.stringify({ name: 'Demo', address: 'Addr' }),
    headers: { 'content-type': 'application/json' },
  })))
  await logResponse('POST /api/rooms', () => createRoom(new Request('http://localhost/api/rooms', {
    method: 'POST',
    body: JSON.stringify({ number: '101', roomTypeId: 1 }),
    headers: { 'content-type': 'application/json' },
  })))
}

void main()
