import type { ConsensusRecord } from '../types/consenso';
import type { EditorialReference } from '../types/common';

/** PDF hospedado localmente em `public/documents/...` — pode usar o leitor integrado. */
export function isLocalHostedConsensusPdf(
  consensus: Pick<ConsensusRecord, 'fileUrl' | 'storagePath' | 'filePath'>,
): boolean {
  const storage = String(consensus.storagePath || consensus.filePath || '').trim();
  if (storage.startsWith('external/')) return false;

  const url = String(consensus.fileUrl || '').trim();
  if (!url || /^https?:\/\//i.test(url)) return false;

  return url.startsWith('/documents/') && /\.pdf(?:$|[?#])/i.test(url);
}

/** URL pública do artigo ou diretriz (DOI, journal, organização). */
export function getConsensusArticleUrl(
  consensus: Pick<ConsensusRecord, 'fileUrl' | 'pdfUrl'>,
  references?: EditorialReference[] | null,
): string | null {
  const fromRefs = (references ?? [])
    .map((ref) => String(ref.url || '').trim())
    .find((url) => /^https?:\/\//i.test(url));
  if (fromRefs) return fromRefs;

  for (const candidate of [consensus.fileUrl, consensus.pdfUrl]) {
    const url = String(candidate || '').trim();
    if (/^https?:\/\//i.test(url)) return url;
  }

  return null;
}
