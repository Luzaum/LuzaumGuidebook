import { cn } from '@/lib/utils'
import { InfoBadge } from './InfoBadge'

type TagPillsProps = {
  tags: string[]
  tone?: 'default' | 'accent' | 'warning' | 'danger' | 'success'
  className?: string
}

export function TagPills({ tags, tone = 'default', className }: TagPillsProps) {
  if (!tags.length) return null

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => (
        <InfoBadge key={tag} tone={tone}>
          {tag}
        </InfoBadge>
      ))}
    </div>
  )
}

