import DOMPurify from 'dompurify'

type RichTextPreviewProps = {
  html: string
}

export function RichTextPreview({ html }: RichTextPreviewProps) {
  const sanitized = DOMPurify.sanitize(html)
  return (
    <div
      className="consulta-vet-mark consulta-vet-prose text-sm leading-7"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  )
}

