import * as React from 'react'

function TooltipProvider({ children }: React.PropsWithChildren<Record<string, unknown>>) {
  return <>{children}</>
}

function Tooltip({ children }: React.PropsWithChildren<Record<string, unknown>>) {
  return <>{children}</>
}

function TooltipTrigger({ children }: React.PropsWithChildren<Record<string, unknown>>) {
  return <>{children}</>
}

function TooltipContent({ children }: React.PropsWithChildren<Record<string, unknown>>) {
  return <>{children}</>
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
