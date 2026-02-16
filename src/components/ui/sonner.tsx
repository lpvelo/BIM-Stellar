"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="top-left"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-[#4db258]" />,
        info: <InfoIcon className="size-4 text-[#3b82f6]" />,
        warning: <TriangleAlertIcon className="size-4 text-[#f59e0b]" />,
        error: <OctagonXIcon className="size-4 text-[#ef4444]" />,
        loading: <Loader2Icon className="size-4 animate-spin text-text-secondary" />,
      }}
      toastOptions={{
        classNames: {
          toast: "group toast shadow-lg rounded-lg border-0",
          description: "text-text-secondary",
          actionButton: "bg-button/20 text-text-primary hover:bg-button/30 rounded-md",
          cancelButton: "bg-background-tertiary text-text-secondary hover:bg-background-tertiary/70 rounded-md",
          success: "bg-background-secondary text-text-primary border-l-4 border-l-[#4db258]",
          error: "bg-background-secondary text-text-primary border-l-4 border-l-[#ef4444]",
          warning: "bg-background-secondary text-text-primary border-l-4 border-l-[#f59e0b]",
          info: "bg-background-secondary text-text-primary border-l-4 border-l-[#3b82f6]",
          loading: "bg-background-secondary text-text-primary border-background-tertiary",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
