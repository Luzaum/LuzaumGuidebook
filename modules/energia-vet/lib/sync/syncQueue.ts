import type { SyncQueueItem } from './types'

const QUEUE_KEY = 'vetius-energia-vet-sync-queue-v1'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function readSyncQueue(): SyncQueueItem[] {
  if (!canUseStorage()) return []
  try {
    const raw = window.localStorage.getItem(QUEUE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as SyncQueueItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function writeSyncQueue(items: SyncQueueItem[]) {
  if (!canUseStorage()) return
  window.localStorage.setItem(QUEUE_KEY, JSON.stringify(items.slice(0, 200)))
}

export function enqueueSyncItem(item: SyncQueueItem) {
  const queue = readSyncQueue().filter((entry) => entry.localId !== item.localId)
  writeSyncQueue([item, ...queue])
}

export function dequeueSyncItem(localId: string) {
  writeSyncQueue(readSyncQueue().filter((entry) => entry.localId !== localId))
}

export function markSyncAttempt(localId: string) {
  const queue = readSyncQueue().map((entry) =>
    entry.localId === localId ? { ...entry, attempts: entry.attempts + 1 } : entry,
  )
  writeSyncQueue(queue)
}
