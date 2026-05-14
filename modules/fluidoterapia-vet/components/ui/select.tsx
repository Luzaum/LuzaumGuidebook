import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '../../lib/utils'

type SelectItemDefinition = {
  value: string
  label: string
}

type SelectContextValue = {
  value: string
  placeholder?: string
  items: SelectItemDefinition[]
  onValueChange?: (value: string) => void
}

const SelectContext = React.createContext<SelectContextValue | null>(null)
type SelectValueProps = { placeholder?: string }
type SelectItemProps = React.PropsWithChildren<{ value: string }>
type SelectContentProps = React.PropsWithChildren<Record<string, unknown>>

function textFromNode(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(textFromNode).join('').trim()
  }

  if (React.isValidElement<React.PropsWithChildren>(node)) {
    return textFromNode(node.props.children)
  }

  return ''
}

function collectItems(
  children: React.ReactNode,
  bucket: SelectItemDefinition[] = [],
): SelectItemDefinition[] {
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      return
    }

    if (child.type === SelectItem) {
      const item = child as React.ReactElement<SelectItemProps>
      bucket.push({
        value: String(item.props.value ?? ''),
        label: textFromNode(item.props.children) || String(item.props.value ?? ''),
      })
      return
    }

    const nested = child as React.ReactElement<React.PropsWithChildren>
    if (nested.props.children) {
      collectItems(nested.props.children, bucket)
    }
  })

  return bucket
}

function findPlaceholder(children: React.ReactNode): string | undefined {
  let result: string | undefined

  React.Children.forEach(children, (child) => {
    if (result || !React.isValidElement(child)) {
      return
    }

    if (child.type === SelectValue) {
      const valueChild = child as React.ReactElement<SelectValueProps>
      if (typeof valueChild.props.placeholder === 'string') {
        result = valueChild.props.placeholder
      }
      return
    }

    const nested = child as React.ReactElement<React.PropsWithChildren>
    if (nested.props.children) {
      result = findPlaceholder(nested.props.children)
    }
  })

  return result
}

function Select({
  value,
  defaultValue,
  onValueChange,
  children,
}: {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
  const items = React.useMemo(() => collectItems(children), [children])
  const placeholder = React.useMemo(() => findPlaceholder(children), [children])
  const resolvedValue = value ?? internalValue

  const handleValueChange = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue)
    }
    onValueChange?.(nextValue)
  }

  return (
    <SelectContext.Provider
      value={{
        value: resolvedValue,
        placeholder,
        items,
        onValueChange: handleValueChange,
      }}
    >
      {children}
    </SelectContext.Provider>
  )
}

function useSelectContext() {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error('Select components must be used inside Select.')
  }
  return context
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const context = useSelectContext()

  return (
    <div className="relative">
      <select
        data-slot="select-trigger"
        className={cn(
          'h-10 w-full appearance-none rounded-lg border border-input bg-transparent px-3 pr-9 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30',
          className,
        )}
        value={context.value}
        onChange={(event) => context.onValueChange?.(event.target.value)}
        {...props}
      >
        {context.placeholder ? (
          <option value="" disabled>
            {context.placeholder}
          </option>
        ) : null}
        {context.items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      {children}
    </div>
  )
}

function SelectValue(_props: SelectValueProps) {
  return null
}

function SelectContent(_props: SelectContentProps) {
  return null
}

function SelectGroup(_props: SelectContentProps) {
  return null
}

function SelectLabel(_props: SelectContentProps) {
  return null
}

function SelectItem(_props: SelectItemProps) {
  return null
}

function SelectSeparator() {
  return null
}

function SelectScrollUpButton() {
  return null
}

function SelectScrollDownButton() {
  return null
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
