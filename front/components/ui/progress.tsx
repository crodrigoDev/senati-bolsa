"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  value: number
  showPercentage?: boolean
}

function Progress({ className, value, showPercentage = true, ...props }: ProgressProps) {
  return (
    <div className="flex items-center gap-2">
      {showPercentage && (
        <span className="text-sm w-10 text-right">{value}%</span>
      )}

      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="size-full flex-1 bg-primary transition-all"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
}

export { Progress }