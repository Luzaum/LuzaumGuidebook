import { supabase } from '../../src/lib/supabaseClient'

export type ProfileImageField =
  | 'clinicLogoDataUrl'
  | 'signatureDataUrl'
  | 'mapaSignatureDataUrl'

export const PROFILE_IMAGE_FIELDS: ProfileImageField[] = [
  'clinicLogoDataUrl',
  'signatureDataUrl',
  'mapaSignatureDataUrl',
]

const STORAGE_PUBLIC_PATH = /\/storage\/v1\/object\/(?:public|sign)\/([^/]+)\/(.+)$/
const DEFAULT_RX_MEDIA_BUCKET = 'receituario-media'

function randomId() {
  try {
    return crypto.randomUUID()
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
  }
}

function sanitizePathSegment(value: string): string {
  return String(value || '')
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function parseErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error || '')
}

function resolveBucketName(): string {
  const fromEnv = String(import.meta.env.VITE_SUPABASE_RX_MEDIA_BUCKET || '').trim()
  return fromEnv || DEFAULT_RX_MEDIA_BUCKET
}

function validateSupabaseEnv() {
  const url = String(import.meta.env.VITE_SUPABASE_URL || '').trim()
  const key = String(import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim()
  if (!url || !key || key.includes('...')) {
    throw new Error('Supabase não configurado para upload. Ajuste VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.')
  }
}

function dataUrlToBlob(dataUrl: string): Blob {
  const match = String(dataUrl || '').match(/^data:([^;]+);base64,(.+)$/)
  if (!match) {
    throw new Error('Formato de imagem inválido para upload.')
  }

  const mime = match[1] || 'application/octet-stream'
  const base64 = match[2] || ''
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }

  return new Blob([bytes], { type: mime })
}

function extensionFromMime(mimeType: string): string {
  const mime = String(mimeType || '').toLowerCase()
  if (mime === 'image/jpeg') return 'jpg'
  if (mime === 'image/jpg') return 'jpg'
  if (mime === 'image/png') return 'png'
  if (mime === 'image/webp') return 'webp'
  if (mime === 'image/gif') return 'gif'
  if (mime === 'image/svg+xml') return 'svg'
  return 'bin'
}

function normalizeUploadError(error: unknown, bucket: string): Error {
  const message = parseErrorMessage(error)
  const lower = message.toLowerCase()

  if (lower.includes('bucket') && (lower.includes('not found') || lower.includes('does not exist'))) {
    return new Error(`Bucket "${bucket}" não encontrado no Supabase Storage.`)
  }

  if (lower.includes('row-level security') || lower.includes('not authorized') || lower.includes('jwt')) {
    return new Error('Sem permissao para upload no Supabase Storage. Verifique login/policies do bucket.')
  }

  if (!message) {
    return new Error('Falha desconhecida no upload para Supabase Storage.')
  }

  return new Error(`Falha no upload para Supabase Storage: ${message}`)
}

function readLocalOwnerKey(): string {
  try {
    const raw = localStorage.getItem('luzaum-user')
    if (!raw) return 'anon'
    const parsed = JSON.parse(raw) as { id?: string; email?: string }
    const candidate = String(parsed?.id || parsed?.email || '').trim()
    return sanitizePathSegment(candidate) || 'anon'
  } catch {
    return 'anon'
  }
}

async function resolveOwnerKey(): Promise<string> {
  try {
    const { data, error } = await supabase.auth.getUser()
    if (!error && data.user?.id) {
      return sanitizePathSegment(data.user.id) || 'anon'
    }
  } catch {
    // fallback below
  }
  return readLocalOwnerKey()
}

export function isDataImageUrl(value: string): boolean {
  return /^data:image\/[^;]+;base64,/i.test(String(value || ''))
}

function parseStorageReferenceFromUrl(fileUrl: string): { bucket: string; path: string } | null {
  const raw = String(fileUrl || '').trim()
  if (!raw) return null

  try {
    const url = new URL(raw)
    const match = url.pathname.match(STORAGE_PUBLIC_PATH)
    if (!match) return null
    const bucket = decodeURIComponent(match[1] || '')
    const path = decodeURIComponent(match[2] || '')
    if (!bucket || !path) return null
    return { bucket, path }
  } catch {
    return null
  }
}

export async function uploadProfileImageDataUrl(params: {
  dataUrl: string
  field: ProfileImageField
  profileId?: string
}) {
  validateSupabaseEnv()

  const bucket = resolveBucketName()
  const ownerKey = await resolveOwnerKey()
  const profileKey = sanitizePathSegment(params.profileId || 'default')
  const blob = dataUrlToBlob(params.dataUrl)
  const ext = extensionFromMime(blob.type)
  const filePath = `receituario/${ownerKey}/profiles/${profileKey}/${params.field}/${Date.now()}-${randomId()}.${ext}`
  const storage = supabase.storage.from(bucket)

  const { error } = await storage.upload(filePath, blob, {
    upsert: false,
    cacheControl: '31536000',
    contentType: blob.type || undefined,
  })

  if (error) {
    throw normalizeUploadError(error, bucket)
  }

  const { data } = storage.getPublicUrl(filePath)
  const publicUrl = String(data?.publicUrl || '').trim()
  if (!publicUrl) {
    throw new Error('Upload concluido, mas não foi possível gerar URL pública da imagem.')
  }

  return {
    bucket,
    path: filePath,
    publicUrl,
  }
}

export async function removeProfileImageByUrl(fileUrl: string) {
  const ref = parseStorageReferenceFromUrl(fileUrl)
  if (!ref) return

  try {
    const { error } = await supabase.storage.from(ref.bucket).remove([ref.path])
    if (error) {
      // Não bloqueia fluxo de salvar perfil por erro de limpeza.
      console.warn('Falha ao remover imagem antiga do Supabase Storage:', error.message)
    }
  } catch (error) {
    console.warn('Falha ao remover imagem antiga do Supabase Storage:', parseErrorMessage(error))
  }
}
